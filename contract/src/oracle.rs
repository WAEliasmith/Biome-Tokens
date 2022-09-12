use std::convert::TryInto;

use crate::*;

#[near_bindgen]
impl Contract {
    pub fn set_oracle_value(
        &mut self,
        oracle_id: OracleId,
        val: OracleVal
    ){
        self.oracles_by_id.insert(&oracle_id, &val);
        
    }
}