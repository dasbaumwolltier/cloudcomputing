use actix_web::{HttpServer, App};

pub mod handlers;

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    HttpServer::new(|| 
        App::new().service(handlers::index)
    ).bind("0.0.0.0:8080")?
    .run()
    .await
}
