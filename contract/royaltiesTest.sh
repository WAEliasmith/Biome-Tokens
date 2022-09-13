set -e

# near delete t.ttt.minqianlu.testnet ttt.minqianlu.testnet
# near delete ttt.minqianlu.testnet minqianlu.testnet

#building and deploying
cd /Users/min/Documents/NEAR_Stuff/Biome-Tokens/contract
sh ./build.sh
near dev-deploy -f /Users/min/Documents/NEAR_Stuff/Biome-Tokens/out/series.wasm && export NFT_CONTRACT_ID=$(cat neardev/dev-account)

#creating fake charity
#near create-account charity.minqianlu.testnet --masterAccount minqianlu.testnet --initialBalance 20


#init series contract metadata
near call $NFT_CONTRACT_ID new_default_meta '{"owner_id": "'$NFT_CONTRACT_ID'"}' --accountId $NFT_CONTRACT_ID 
near view $NFT_CONTRACT_ID nft_metadata

#init series with no royalties
near create-account owner.$NFT_CONTRACT_ID --masterAccount $NFT_CONTRACT_ID --initialBalance 25 && export SERIES_OWNER=owner.$NFT_CONTRACT_ID
near call $NFT_CONTRACT_ID add_approved_creator '{"account_id": "'$SERIES_OWNER'"}' --accountId $NFT_CONTRACT_ID
near call $NFT_CONTRACT_ID create_series '{"id": 1, "metadata": {"title": "SERIES!", "description": "testing out the new series contract", "media": "https://bafybeiftczwrtyr3k7a2k4vutd3amkwsmaqyhrdzlhvpt33dyjivufqusq.ipfs.dweb.link/goteam-gif.gif"}, "charity_id": "charity.minqianlu.testnet", "good_range": 5, "bad_range": 100}' --accountId $SERIES_OWNER --amount 1
near view $NFT_CONTRACT_ID get_series

#change royalties and check if it changed
near call $NFT_CONTRACT_ID update_series_royalty '{"tracked_val": 100, "id": 1}' --accountId $SERIES_OWNER
near view $NFT_CONTRACT_ID get_series



#near create-account BT.minqianlu.testnet --masterAccount minqianlu.testnet --initialBalance 25 && export SERIES_OWNER=BT.minqianlu.testnet



# near deploy BT.minqianlu.testnet --wasmFile out/series.wasm

# near call BT.minqianlu.testnet new --accountId ttt.minqianlu.testnet



