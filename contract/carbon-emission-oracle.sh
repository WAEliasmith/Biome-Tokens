set -e

CarbonEmission=`python oracle/carbon-emission-oracle.py`
echo $CarbonEmission
OwnerId="biome.zdefranc.testnet"
echo 1
near call biome.zdefranc.testnet set_oracle_value "{\"oracle_id\": \"emissions\", \"val\": \"4\"}" --accountId biome.zdefranc.testnet
near call $OwnerId set_oracle_value "{\"oracle_id\": \"emissions\", \"val\": \"$CarbonEmission\"}" --accountId $OwnerId