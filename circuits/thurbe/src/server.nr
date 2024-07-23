#[oracle(get_content_owner)]
unconstrained pub fn content(content_id: Field, content_type: u64) -> Field {}