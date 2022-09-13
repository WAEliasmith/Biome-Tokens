set -e




near create-account biome.zdefranc.testnet --masterAccount zdefranc.testnet

./build.sh

pwd

near deploy biome.zdefranc.testnet --wasmFile res/series.wasm

near call biome.zdefranc.testnet new_default_meta "{\"owner_id\": \"biome.zdefranc.testnet\"}"  --accountId biome.zdefranc.testnet

near call biome.zdefranc.testnet add_oracle "{\"oracle_id\": \"emissions\", \"val\": \"4\"}" --accountId biome.zdefranc.testnet

near call biome.zdefranc.testnet set_oracle_value "{\"oracle_id\": \"emissions\", \"val\": \"4\"}" --accountId biome.zdefranc.testnet
near call biome.zdefranc.testnet set_oracle_value "{\"oracle_id\": \"emissions\", \"val\": \"4\"}" --accountId biome.zdefranc.testnet