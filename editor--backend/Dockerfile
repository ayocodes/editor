# Use the official Rust image as a base
FROM rust:latest

# Install necessary dependencies
RUN apt-get update && \
    apt-get install -y curl && \
    apt-get install -y binaryen

# Set up Rust and ink!
RUN curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh && \
    source ~/.cargo/env && \
    rustup toolchain install nightly && \
    rustup component add rust-src --toolchain nightly && \
    rustup target add wasm32-unknown-unknown --toolchain nightly

# Set the working directory
WORKDIR /usr/src/app

# Copy the local code to the container
COPY . .

# Compile the code
RUN cargo +nightly contract build --release