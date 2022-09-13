// use std::convert::TryInto;

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
        self.oracles_by_id.insert(&oracle_id, &val.parse::<f64>().unwrap());
    }

    pub fn set_oracle_value(
        &mut self,
        oracle_id: OracleId,
        val: String
    ){
        self.assert_contract_owner();
        assert_ne!(self.oracles_by_id.get(&oracle_id), None, "Oracle Id does not exist");
        self.oracles_by_id.insert(&oracle_id, &val.parse::<f64>().unwrap());

        env::log_str(&format!("{}",&self.oracles_by_id.get(&oracle_id).unwrap()))
    }
<<<<<<< HEAD

    pub fn get_oracle_value(
        &mut self,
        oracle_id: OracleId
    ) -> f64 {
        assert_ne!(self.oracles_by_id.get(&oracle_id), None, "Oracle Id does not exist");
        let oracle_val = self.oracles_by_id.get(&oracle_id).unwrap();
        env::log_str(&format!("Oracle {} value: {}",oracle_id,oracle_val));
        oracle_val
    }
}
=======
}

>>>>>>> 7c9a56a41266e3f4b20cc543c1b018df08e097bc
