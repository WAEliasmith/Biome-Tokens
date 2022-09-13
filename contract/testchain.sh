set -e

near create-account biome.zdefranc.testnet --masterAccount zdefranc.testnet

./build.sh

near deploy biome.zdefranc.testnet --wasmFile res/series.wasm

near call biome.zdefranc.testnet new_default_meta "{\"owner_id\": \"biome.zdefranc.testnet\"}"  --accountId biome.zdefranc.testnet

near call biome.zdefranc.testnet add_oracle "{\"oracle_id\": \"emissions\", \"oracle_name\": \"Carbon Emissions\", \"val\": \"4\", \"unit\": \"mol/m²\"}" --accountId biome.zdefranc.testnet

near call biome.zdefranc.testnet set_oracle_value "{\"oracle_id\": \"emissions\", \"val\": \"4\"}" --accountId biome.zdefranc.testnet
near call biome.zdefranc.testnet set_oracle_value "{\"oracle_id\": \"emissions\", \"val\": \"4\"}" --accountId biome.zdefranc.testnet

NFT_CONTRACT_ID="biome.zdefranc.testnet"
SERIES_OWNER=$NFT_CONTRACT_ID
near call $NFT_CONTRACT_ID create_series "{\"id\": 1, \"metadata\": {\"title\": \"SERIES\", \"description\": \"testing out the new series contract\", \"media\": \"https://bafybeiftczwrtyr3k7a2k4vutd3amkwsmaqyhrdzlhvpt33dyjivufqusq.ipfs.dweb.link/goteam-gif.gif\"},\"charity_id\":\"zdefranc.testnet\", \"oracle_id\":\"emissions\"}" --accountId $SERIES_OWNER --amount 1

near call biome.zdefranc.testnet get_oracles --accountId biome.zdefranc.testnet
echo breaks
near call biome.zdefranc.testnet get_series --accountId biome.zdefranc.testnet