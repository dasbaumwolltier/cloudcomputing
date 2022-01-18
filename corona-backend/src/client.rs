use std::io;

use cached::proc_macro::cached;

use chrono::{DateTime, Utc};
use reqwest::{StatusCode, Error};
use serde::{Deserialize, Serialize};
use serde_with::skip_serializing_none;

#[derive(Clone, Deserialize, Serialize)]
#[serde(rename_all(deserialize = "PascalCase"))]
pub struct CoronaBackendResponse {
    country: String,
    date: DateTime<Utc>,
    confirmed: u64,
    deaths: u64,
    recovered: u64,
    active: u64,
}

fn is_zero(arg: &u64) -> bool {
    *arg == 0
}

// #[derive(Clone, Deserialize)]
// #[serde(rename_all = "PascalCase")]
// pub struct CoronaApiResponse {
//     country: String,
//     date: DateTime<Utc>,

//     confirmed: u64,
//     deaths: u64,
//     recovered: u64,
//     active: u64,
// }

// impl CoronaBackendResponse {
//     fn from_property(other: &CoronaApiResponse, property: Option<&String>) -> Self {
//         let mut result = Self {
//             country: other.country.to_owned(),
//             date: other.date,

//             confirmed: None,
//             deaths: None,
//             recovered: None,
//             active: None,
//         };

//         if property.is_some() {
//             match property.unwrap().as_str() {
//                 "confirmed" => result.confirmed = Some(other.confirmed),
//                 "deaths" => result.deaths = Some(other.deaths),
//                 "recovered" => result.recovered = Some(other.recovered),
//                 "active" => result.active = Some(other.active),
//                 _ => {}
//             }
//         } else {
//             result.confirmed = Some(other.confirmed);
//             result.deaths = Some(other.deaths);
//             result.recovered = Some(other.recovered);
//             result.active = Some(other.active);
//         }

//         return result;
//     }
// }

const API_BASE_URL: &'static str = "https://api.covid19api.com";

pub async fn get_corona(country: &String, property: Option<&String>, from: Option<&DateTime<Utc>>, to: Option<&DateTime<Utc>>) -> reqwest::Result<Vec<CoronaBackendResponse>> {
    let result = get_corona_http(country.to_owned()).await?;

    Ok(
        result.into_iter()
            .filter(|r| from.is_none() || from.unwrap() <= &r.date)
            .filter(|r| to.is_none() || to.unwrap() > &r.date)
            .map(|r| filter_properties(r, property))
            // .map(|r| CoronaBackendResponse::from_property(&r, property))
            .collect()
    )
}

#[cached(time = 86400, result = true)]
async fn get_corona_http(country: String) -> reqwest::Result<Vec<CoronaBackendResponse>> {
    let response = reqwest::get(format!("{}/country/{}", API_BASE_URL, country)).await?;
    response.error_for_status()?.json().await
}

fn filter_properties(response: CoronaBackendResponse, property: Option<&String>) -> CoronaBackendResponse {
    let mut result = CoronaBackendResponse {
        country: response.country.to_owned(),
        date: response.date.to_owned(),

        confirmed: 0,
        deaths: 0,
        recovered: 0,
        active: 0
    };

    if property.is_some() {
        match property.unwrap().as_str() {
            "confirmed" => result.confirmed = response.confirmed,
            "deaths" => result.deaths = response.confirmed,
            "recovered" => result.recovered = response.confirmed,
            "active" => result.active = response.confirmed,
            _ => {}
        }
    } else {
        result.confirmed = response.confirmed;
        result.deaths = response.deaths;
        result.recovered = response.recovered;
        result.active = response.active;
    }

    return result;
}