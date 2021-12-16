use actix_web::{get, Result, web, error::{self, ErrorInternalServerError, InternalError}, Responder};

use chrono::{DateTime, Utc, serde::ts_seconds_option};
use serde::{Deserialize, Serialize, Serializer};

use super::client::get_corona;

#[derive(Default, Deserialize, Serialize)]
#[serde(default)]
struct Params {
    property: Option<String>,

    #[serde(with = "ts_seconds_option")]
    from: Option<DateTime<Utc>>,

    #[serde(with = "ts_seconds_option")]
    to: Option<DateTime<Utc>>
}

#[get("/api/{country}")]
async fn index(country: web::Path<String>, query: web::Query<Params>) -> Result<impl Responder> {
    let test = get_corona(country.as_ref(), query.property.as_ref(), query.from.as_ref(), query.to.as_ref()).await;

    test.map_err(|e| match e.status() {
            Some(status) => InternalError::new(e, status).into(),
            None => ErrorInternalServerError(e)
        })
        .map(web::Json)
}