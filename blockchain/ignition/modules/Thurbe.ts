import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";
import "@nomicfoundation/hardhat-ignition-ethers";
import ThurbeTokenModule from "./ThurbeToken";

const ThurbeModule = buildModule("ThurbeModule", (m) => {
    const { thurbeToken } = m.useModule(ThurbeTokenModule);

    const thurbe = m.contract("Thurbe", [thurbeToken]);

    return { thurbe };
});

export default ThurbeModule;