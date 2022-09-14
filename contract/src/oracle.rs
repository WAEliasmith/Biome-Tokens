

//use core::num::dec2flt::float;

use crate::{*, royalty::NonFungibleTokenCore};

#[near_bindgen]
impl Contract {
    pub fn add_oracle(
        &mut self,
        oracle_id: OracleId,
        oracle_name: String,
        val: String,
        unit: String
    ){
        self.assert_contract_owner();
        assert_eq!(self.oracles_by_id.get(&oracle_id), None, "Oracle Id aready exists");
        self.oracles_by_id.insert(&oracle_id, &Oracle { 
            unit,
            oracle_val: (val.parse::<f64>().unwrap()), 
            oracle_name: (oracle_name) 
        });
    }

    pub fn set_oracle_value(
        &mut self,
        oracle_id: OracleId,
        val: String
    ){
        self.assert_contract_owner();
        assert_ne!(self.oracles_by_id.get(&oracle_id), None, "Oracle Id does not exist");
        let float_val = val.parse::<f64>().unwrap();
        let mut oracle_from_id = self.oracles_by_id.get(&oracle_id).unwrap();
        oracle_from_id.oracle_val = float_val;
        self.oracles_by_id.insert(&oracle_id, &oracle_from_id);
        let series_by_id = self.series_by_id.to_vec();
        for (series_id,series) in series_by_id {
            if oracle_id == series.oracle_id {
                self.update_series_royalty(float_val, series_id);
            }
        }
        env::log_str(&format!("{}",&self.oracles_by_id.get(&oracle_id).unwrap().oracle_val));
    }

    pub fn get_oracle_value(
        &self,
        oracle_id: OracleId
    ) -> f64 {
        assert_ne!(self.oracles_by_id.get(&oracle_id), None, "Oracle Id does not exist");
        let oracle_val = self.oracles_by_id.get(&oracle_id).unwrap().oracle_val;
        env::log_str(&format!("Oracle {} value: {}",oracle_id,oracle_val));
        oracle_val
    }

}