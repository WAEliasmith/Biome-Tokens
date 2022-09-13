use std::convert::TryInto;

use serde_json::to_string;

use crate::*;

#[near_bindgen]
impl Contract {
    pub fn add_oracle(
        &mut self,
        oracle_id: OracleId,
        val: String
    ){
        self.assert_contract_owner();
        assert_eq!(self.oracles_by_id.get(&oracle_id), None, "Oracle Id aready exists");
        self.oracles_by_id.insert(&oracle_id, &val.parse::<i128>().unwrap());
    }

    pub fn set_oracle_value(
        &mut self,
        oracle_id: OracleId,
        val: String
    ){
        self.assert_contract_owner();
        assert_ne!(self.oracles_by_id.get(&oracle_id), None, "Oracle Id does not exist");
        self.oracles_by_id.insert(&oracle_id, &val.parse::<i128>().unwrap());

        env::log_str(&format!("{}",&self.oracles_by_id.get(&oracle_id).unwrap()))
    }
}