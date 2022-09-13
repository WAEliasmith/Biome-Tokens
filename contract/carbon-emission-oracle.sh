set -e

CarbonEmission=`python oracle/carbon-emission-oracle.py`
OwnerId="biome.zdefranc.testnet"
near call $OwnerId set_oracle_value "{\"oracle_id\": \"emissions\", \"val\": \"$CarbonEmission\"}" --accountId $OwnerId
near call biome.zdefranc.testnet get_oracle_value "{\"oracle_id\": \"emissions\"}" --accountId biome.zdefranc.testnet