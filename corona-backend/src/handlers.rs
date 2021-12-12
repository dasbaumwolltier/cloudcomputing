use actix_web::{get, HttpRequest, Result};

#[get("/")]
async fn index(_: HttpRequest) -> Result<&'static str> {
    Ok("Hallo")
}