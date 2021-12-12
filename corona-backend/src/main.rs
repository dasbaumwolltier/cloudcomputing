use actix_web::{HttpServer, App};
use log::{info, LevelFilter};
use simplelog::{SimpleLogger, Config, TermLogger, TerminalMode, ColorChoice};

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

    HttpServer::new(|| 
        App::new().service(handlers::index)
    ).bind("0.0.0.0:8080")?
    .run()
    .await
}