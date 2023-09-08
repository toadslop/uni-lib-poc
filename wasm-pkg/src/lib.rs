wai_bindgen_rust::export!("exports.wai");
wai_bindgen_rust::import!("imports.wai");

struct Exports;

impl exports::Exports for Exports {
    fn init(_source: String) -> Result<(), String> {
        Ok(())
    }

    fn execute() -> Result<exports::ExecResult, String> {
        Ok(exports::ExecResult::Bool(true))
    }
}
