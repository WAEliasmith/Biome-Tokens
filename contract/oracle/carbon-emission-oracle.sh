CarbonEmission=`python contract/oracle/carbon-emission-oracle.py`
echo $CarbonEmission
owner_id="biome.zdefranc.testnet"
near call $owner_id set_oracle_value "{\"oracle_id\": \"emissions\", \"val\": \"5\"}" --accountId $owner_id 