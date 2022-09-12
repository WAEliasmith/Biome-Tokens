use std::convert::TryInto;

use crate::*;

#[near_bindgen]
impl Contract {
    pub fn update_series_royalty(
        &mut self,
        val: i128,
        id: u64
    ) {
        env::log_str(&format!("Value: {}",val));
        //get the series from the map
        let mut series = self.series_by_id.get(&id).expect("No series exists with the given id.");

        let mut charity_royalty_perc = (val-series.good_range)/(series.bad_range-series.good_range);
        if charity_royalty_perc > 1 {
            charity_royalty_perc = 1
        } else if charity_royalty_perc < 0 {
            charity_royalty_perc = 0
        }
        let charity_account_id = series.charity_id.clone();
        let mut royaltys = series.royalty.unwrap();
        royaltys.insert(charity_account_id.clone(), charity_royalty_perc.try_into().unwrap());
        // TODO this only works for one royalty
        for (k, v) in royaltys.iter_mut() {
            if k != &charity_account_id {
                *v = (1-charity_royalty_perc).try_into().unwrap();
            }
        }
        series.royalty = Some(royaltys);
        self.series_by_id.insert(&id, &series);
        for (k,v) in self.series_by_id.get(&id).unwrap().royalty.unwrap().iter() {
            env::log_str(&format!("{} {}",k,v))
        }
    }
}