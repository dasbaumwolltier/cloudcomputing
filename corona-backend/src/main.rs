#[macro_use] extern crate cached;

use actix_cors::Cors;
use actix_web::{HttpServer, App};
use log::{info, LevelFilter};
use simplelog::{Config, TermLogger, TerminalMode, ColorChoice};

pub mod client;
pub mod handlers;

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    TermLogger::init(
        LevelFilter::Debug,
        Config::default(), 
        TerminalMode::Stdout, 
        ColorChoice::Auto
    ).expect("Could not initialise logger!");

    info!("Starting server!");

    HttpServer::new(|| {
        let cors_config = Cors::default()
            .allow_any_origin()
            .allow_any_header()
            .allowed_methods(vec!["GET"]);

        return App::new().wrap(cors_config).service(handlers::index);
    }).bind("0.0.0.0:8080")?
    .run()
    .await
}