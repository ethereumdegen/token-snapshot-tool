### TODO 

#### Fetching Data 
  - use vibegraph to fetch all token data (need config) (this runs in background and will report the blocknumber it has reached with a task command) 



#### Computing merkle root 

  - write a task script that loops thru the cached vibegraph data to build a snapshot ledger (at a current block) 


  the proof will be a tree of hashes.  each leaf is  keccak256(accountAddress, amountClaimable) )