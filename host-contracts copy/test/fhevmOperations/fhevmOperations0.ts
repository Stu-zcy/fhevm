//npx hardhat test test/fhevmOperations/fhevmOperations0.ts
import { expect } from 'chai';
import { ethers } from 'hardhat';

import type { FHEVMTestSuite1 } from '../../examples/tests/FHEVMTestSuite1';
import type { FHEVMTestSuite2 } from '../../examples/tests/FHEVMTestSuite2';
import type { FHEVMTestSuite3 } from '../../examples/tests/FHEVMTestSuite3';
import type { FHEVMTestSuite4 } from '../../examples/tests/FHEVMTestSuite4';
import type { FHEVMTestSuite5 } from '../../examples/tests/FHEVMTestSuite5';
import type { FHEVMTestSuite6 } from '../../examples/tests/FHEVMTestSuite6';
import type { FHEVMTestSuite7 } from '../../examples/tests/FHEVMTestSuite7';
import {
  createInstances,
  decrypt8,
  decrypt16,
  decrypt32,
  decrypt64,
  decrypt128,
  decrypt256,
  decryptBool,
} from '../instance';
import { getSigners, initSigners } from '../signers';

async function deployFHEVMTestFixture1(): Promise<FHEVMTestSuite1> {
  const signers = await getSigners();
  const admin = signers.alice;

  const contractFactory = await ethers.getContractFactory('FHEVMTestSuite1');
  const contract = await contractFactory.connect(admin).deploy();
  await contract.waitForDeployment();

  return contract;
}

async function deployFHEVMTestFixture2(): Promise<FHEVMTestSuite2> {
  const signers = await getSigners();
  const admin = signers.alice;

  const contractFactory = await ethers.getContractFactory('FHEVMTestSuite2');
  const contract = await contractFactory.connect(admin).deploy();
  await contract.waitForDeployment();

  return contract;
}

async function deployFHEVMTestFixture3(): Promise<FHEVMTestSuite3> {
  const signers = await getSigners();
  const admin = signers.alice;

  const contractFactory = await ethers.getContractFactory('FHEVMTestSuite3');
  const contract = await contractFactory.connect(admin).deploy();
  await contract.waitForDeployment();

  return contract;
}

async function deployFHEVMTestFixture4(): Promise<FHEVMTestSuite4> {
  const signers = await getSigners();
  const admin = signers.alice;

  const contractFactory = await ethers.getContractFactory('FHEVMTestSuite4');
  const contract = await contractFactory.connect(admin).deploy();
  await contract.waitForDeployment();

  return contract;
}

async function deployFHEVMTestFixture5(): Promise<FHEVMTestSuite5> {
  const signers = await getSigners();
  const admin = signers.alice;

  const contractFactory = await ethers.getContractFactory('FHEVMTestSuite5');
  const contract = await contractFactory.connect(admin).deploy();
  await contract.waitForDeployment();

  return contract;
}

async function deployFHEVMTestFixture6(): Promise<FHEVMTestSuite6> {
  const signers = await getSigners();
  const admin = signers.alice;

  const contractFactory = await ethers.getContractFactory('FHEVMTestSuite6');
  const contract = await contractFactory.connect(admin).deploy();
  await contract.waitForDeployment();

  return contract;
}

async function deployFHEVMTestFixture7(): Promise<FHEVMTestSuite7> {
  const signers = await getSigners();
  const admin = signers.alice;

  const contractFactory = await ethers.getContractFactory('FHEVMTestSuite7');
  const contract = await contractFactory.connect(admin).deploy();
  await contract.waitForDeployment();

  return contract;
}

describe('FHEVM operations0', function () {
  before(async function () {
    await initSigners(1);
    this.signers = await getSigners();

    // 打印 admin 地址
    const adminAddr = await this.signers.alice.getAddress();
    console.log('[ADMIN]', adminAddr);

    // 用于汇总展示各合约的部署地址
    const deployments: Array<{ name: string; address: string }> = [];

    const contract1 = await deployFHEVMTestFixture1();
    this.contract1Address = await contract1.getAddress();
    this.contract1 = contract1;
    deployments.push({ name: 'FHEVMTestSuite1', address: this.contract1Address });

    const contract2 = await deployFHEVMTestFixture2();
    this.contract2Address = await contract2.getAddress();
    this.contract2 = contract2;
    deployments.push({ name: 'FHEVMTestSuite2', address: this.contract2Address });

    const contract3 = await deployFHEVMTestFixture3();
    this.contract3Address = await contract3.getAddress();
    this.contract3 = contract3;
    deployments.push({ name: 'FHEVMTestSuite3', address: this.contract3Address });

    const contract4 = await deployFHEVMTestFixture4();
    this.contract4Address = await contract4.getAddress();
    this.contract4 = contract4;
    deployments.push({ name: 'FHEVMTestSuite4', address: this.contract4Address });

    const contract5 = await deployFHEVMTestFixture5();
    this.contract5Address = await contract5.getAddress();
    this.contract5 = contract5;
    deployments.push({ name: 'FHEVMTestSuite5', address: this.contract5Address });

    const contract6 = await deployFHEVMTestFixture6();
    this.contract6Address = await contract6.getAddress();
    this.contract6 = contract6;
    deployments.push({ name: 'FHEVMTestSuite6', address: this.contract6Address });

    const contract7 = await deployFHEVMTestFixture7();
    this.contract7Address = await contract7.getAddress();
    this.contract7 = contract7;
    deployments.push({ name: 'FHEVMTestSuite7', address: this.contract7Address });

    // 统一打印部署表
    console.table(deployments);

    const instances = await createInstances(this.signers);
    this.instances = instances;
  });
  it('print deployments', async function () {
    const adminAddr = await this.signers.alice.getAddress();
    console.log('[ADMIN]', adminAddr);
    console.table([{ name: 'FHEVMTestSuite1', address: this.contract1Address }]);
  });
  // it('test operator "add" overload (euint8, euint8) => euint8 test 1 (125, 43)', async function () {
  //   const input = this.instances.alice.createEncryptedInput(this.contract1Address, this.signers.alice.address);
  //   input.add8(125n);
  //   input.add8(43n);
  //   const encryptedAmount = await input.encrypt();
  //   const tx = await this.contract1.add_euint8_euint8(
  //     encryptedAmount.handles[0],
  //     encryptedAmount.handles[1],
  //     encryptedAmount.inputProof,
  //   );
  //   await tx.wait();
  //   const res = await decrypt8(await this.contract1.resEuint8());
  //   expect(res).to.equal(168n);
  // });

  // it('test operator "add" overload (euint8, euint8) => euint8 test 2 (81, 85)', async function () {
  //   const input = this.instances.alice.createEncryptedInput(this.contract1Address, this.signers.alice.address);
  //   input.add8(81n);
  //   input.add8(85n);
  //   const encryptedAmount = await input.encrypt();
  //   const tx = await this.contract1.add_euint8_euint8(
  //     encryptedAmount.handles[0],
  //     encryptedAmount.handles[1],
  //     encryptedAmount.inputProof,
  //   );
  //   await tx.wait();
  //   const res = await decrypt8(await this.contract1.resEuint8());
  //   expect(res).to.equal(166n);
  // });
});
