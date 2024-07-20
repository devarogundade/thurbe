import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";
import "@nomicfoundation/hardhat-ignition-ethers";

const ThurbeTokenModule = buildModule("ThurbeTokenModule", (m) => {
    const thurbeToken = m.contract("ThurbeToken", []);

    return { thurbeToken };
});

export default ThurbeTokenModule;