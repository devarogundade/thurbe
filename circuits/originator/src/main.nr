use dep::std;
use dep::ecrecover;

fn main(pub_key: [u8; 64], signature: [u8; 64], hashed_message: [u8; 32], streamer: pub Field) {
    // Convert pub_key to secp256k1 key
    let key = ecrecover::secp256k1::PubKey::from_unified(pub_key);

    let address = key.to_eth_address();

    // Recover address from the signed message.
    let computed_address = key.ecrecover(signature, hashed_message);

    // Check if the address is the signer.
    assert(address == computed_address);

    // Check if the address is the streamer.
    assert(computed_address == streamer);
}
