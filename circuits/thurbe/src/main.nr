use dep::std;
use dep::ecrecover;

mod server;

#[export]
unconstrained fn get_content_owner(content_id: Field, content_type: u64) -> Field {
    server::content(content_id, content_type)
}

// Define the main function for the circuit.
fn main(
    content_id: Field,
    content_type: u64,
    pub_key: [u8; 64],
    signature: [u8; 64],
    hashed_message: pub [u8; 32]
) {
    // Convert pub_key to secp256k1 key
    let key = ecrecover::secp256k1::PubKey::from_unified(pub_key);

    let address = key.to_eth_address();
    
    // Get address balance
    let creator = get_content_owner(content_id, content_type);

    // Check the creator
    assert(creator == address);

    // Recover address from the signed message
    let computed_address = key.ecrecover(signature, hashed_message);

    // Check if the address was the signer
    assert(address == computed_address);
}