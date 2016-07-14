#!/usr/bin/env bash

echo "Starting Rethink Tunnel..."
ssh -L 28015:localhost:28015 74.117.209.251 -p 3389t
