const BasTradableOwnershipJson = {
  contractName: "BasTradableOwnership",
  abi: [
    {
      inputs: [
        {
          internalType: "address",
          name: "rel",
          type: "address"
        }
      ],
      payable: false,
      stateMutability: "nonpayable",
      type: "constructor",
      signature: "constructor"
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: "bytes32",
          name: "nameHash",
          type: "bytes32"
        },
        {
          indexed: false,
          internalType: "address",
          name: "owner",
          type: "address"
        }
      ],
      name: "Add",
      type: "event",
      signature:
        "0x5f17f6377b8024fbe396282bbccde46c3c704613385bd2f4b4b3ff955fd56a35"
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: "address",
          name: "from",
          type: "address"
        },
        {
          indexed: false,
          internalType: "address",
          name: "to",
          type: "address"
        },
        {
          indexed: false,
          internalType: "bytes32",
          name: "nameHash",
          type: "bytes32"
        }
      ],
      name: "Approval",
      type: "event",
      signature:
        "0x36a9e0c1da9cdc6d8f4bd4cb261f9ad6a45eb1641a557ead7530fbeff9a26336"
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: "bytes32",
          name: "nameHash",
          type: "bytes32"
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "time",
          type: "uint256"
        }
      ],
      name: "Extend",
      type: "event",
      signature:
        "0xe898863b26adf3af54e82709ac1a76136eaaa5f3a7d9b790ce6d539d508e75ff"
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: "address",
          name: "from",
          type: "address"
        },
        {
          indexed: false,
          internalType: "bytes32",
          name: "nameHash",
          type: "bytes32"
        }
      ],
      name: "Revoke",
      type: "event",
      signature:
        "0xc7fb647e59b18047309aa15aad418e5d7ca96d173ad704f1031a2c3d7591734b"
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: "bytes32",
          name: "nameHash",
          type: "bytes32"
        },
        {
          indexed: false,
          internalType: "address",
          name: "from",
          type: "address"
        },
        {
          indexed: false,
          internalType: "address",
          name: "to",
          type: "address"
        }
      ],
      name: "Takeover",
      type: "event",
      signature:
        "0xae53ff61a227b196db64e2dea26e80d455bb2d90fd10372db78b44ace9cb0f62"
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: "bytes32",
          name: "nameHash",
          type: "bytes32"
        },
        {
          indexed: false,
          internalType: "address",
          name: "from",
          type: "address"
        },
        {
          indexed: false,
          internalType: "address",
          name: "to",
          type: "address"
        }
      ],
      name: "Transfer",
      type: "event",
      signature:
        "0x57972c0bcb114a9f52d3501767c95a65e93901ff48da6677c7399b5593b4e999"
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: "bytes32",
          name: "nameHash",
          type: "bytes32"
        },
        {
          indexed: false,
          internalType: "address",
          name: "from",
          type: "address"
        },
        {
          indexed: false,
          internalType: "address",
          name: "to",
          type: "address"
        },
        {
          indexed: false,
          internalType: "address",
          name: "by",
          type: "address"
        }
      ],
      name: "TransferFrom",
      type: "event",
      signature:
        "0x3f8c833a27e9521421e46d68c5a31e603cc465fc4bbff2226b98d964252ebb3f"
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: "bytes32",
          name: "nameHash",
          type: "bytes32"
        },
        {
          indexed: false,
          internalType: "address",
          name: "owner",
          type: "address"
        }
      ],
      name: "Update",
      type: "event",
      signature:
        "0xb2b848c23b147f2d3c11308c74cb0ff81a30b54628e5c73c4d70bf623eb98f72"
    },
    {
      constant: false,
      inputs: [
        {
          internalType: "address",
          name: "newDao",
          type: "address"
        }
      ],
      name: "ChangeDAO",
      outputs: [],
      payable: false,
      stateMutability: "nonpayable",
      type: "function",
      signature: "0x8a42876b"
    },
    {
      constant: true,
      inputs: [],
      name: "DAOAddress",
      outputs: [
        {
          internalType: "address",
          name: "",
          type: "address"
        }
      ],
      payable: false,
      stateMutability: "view",
      type: "function",
      signature: "0xd392eab1"
    },
    {
      constant: true,
      inputs: [
        {
          internalType: "address",
          name: "owner",
          type: "address"
        },
        {
          internalType: "bytes32",
          name: "nameHash",
          type: "bytes32"
        }
      ],
      name: "allowance",
      outputs: [
        {
          internalType: "address",
          name: "",
          type: "address"
        }
      ],
      payable: false,
      stateMutability: "view",
      type: "function",
      signature: "0xbcf9fcad"
    },
    {
      constant: false,
      inputs: [
        {
          internalType: "bytes32",
          name: "nameHash",
          type: "bytes32"
        },
        {
          internalType: "address",
          name: "spender",
          type: "address"
        }
      ],
      name: "approve",
      outputs: [],
      payable: false,
      stateMutability: "nonpayable",
      type: "function",
      signature: "0xb2e2c99b"
    },
    {
      constant: true,
      inputs: [],
      name: "assetsCountsOf",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256"
        }
      ],
      payable: false,
      stateMutability: "view",
      type: "function",
      signature: "0x8549ddd1"
    },
    {
      constant: true,
      inputs: [
        {
          internalType: "uint256",
          name: "start",
          type: "uint256"
        },
        {
          internalType: "uint256",
          name: "end",
          type: "uint256"
        }
      ],
      name: "assetsOf",
      outputs: [
        {
          internalType: "bytes32[]",
          name: "",
          type: "bytes32[]"
        }
      ],
      payable: false,
      stateMutability: "view",
      type: "function",
      signature: "0xd2a03b51"
    },
    {
      constant: false,
      inputs: [
        {
          internalType: "address",
          name: "new_rel",
          type: "address"
        }
      ],
      name: "changeRelation",
      outputs: [],
      payable: false,
      stateMutability: "nonpayable",
      type: "function",
      signature: "0x57b29ef4"
    },
    {
      constant: false,
      inputs: [
        {
          internalType: "bytes32",
          name: "nameHash",
          type: "bytes32"
        },
        {
          internalType: "uint256",
          name: "extend",
          type: "uint256"
        }
      ],
      name: "extendTime",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256"
        }
      ],
      payable: false,
      stateMutability: "nonpayable",
      type: "function",
      signature: "0xc3f7beda"
    },
    {
      constant: false,
      inputs: [
        {
          internalType: "bytes32",
          name: "nameHash",
          type: "bytes32"
        },
        {
          internalType: "address",
          name: "owner",
          type: "address"
        },
        {
          internalType: "uint256",
          name: "expire",
          type: "uint256"
        }
      ],
      name: "newOwnership",
      outputs: [],
      payable: false,
      stateMutability: "nonpayable",
      type: "function",
      signature: "0x4f9a1fbb"
    },
    {
      constant: true,
      inputs: [
        {
          internalType: "bytes32",
          name: "nameHash",
          type: "bytes32"
        }
      ],
      name: "ownerOf",
      outputs: [
        {
          internalType: "address",
          name: "",
          type: "address"
        }
      ],
      payable: false,
      stateMutability: "view",
      type: "function",
      signature: "0x7dd56411"
    },
    {
      constant: true,
      inputs: [
        {
          internalType: "bytes32",
          name: "nameHash",
          type: "bytes32"
        }
      ],
      name: "ownerOfWithExpire",
      outputs: [
        {
          internalType: "address",
          name: "",
          type: "address"
        },
        {
          internalType: "uint256",
          name: "",
          type: "uint256"
        }
      ],
      payable: false,
      stateMutability: "view",
      type: "function",
      signature: "0x33eeb127"
    },
    {
      constant: true,
      inputs: [],
      name: "rel",
      outputs: [
        {
          internalType: "contract BasRelations",
          name: "",
          type: "address"
        }
      ],
      payable: false,
      stateMutability: "view",
      type: "function",
      signature: "0xce26e78a"
    },
    {
      constant: false,
      inputs: [
        {
          internalType: "bytes32",
          name: "nameHash",
          type: "bytes32"
        }
      ],
      name: "revoke",
      outputs: [],
      payable: false,
      stateMutability: "nonpayable",
      type: "function",
      signature: "0xb75c7dc6"
    },
    {
      constant: false,
      inputs: [
        {
          internalType: "bytes32",
          name: "nameHash",
          type: "bytes32"
        },
        {
          internalType: "address",
          name: "owner",
          type: "address"
        },
        {
          internalType: "uint256",
          name: "expire",
          type: "uint256"
        }
      ],
      name: "takeover",
      outputs: [],
      payable: false,
      stateMutability: "nonpayable",
      type: "function",
      signature: "0xb9566b10"
    },
    {
      constant: false,
      inputs: [
        {
          internalType: "bytes32",
          name: "nameHash",
          type: "bytes32"
        },
        {
          internalType: "address",
          name: "to",
          type: "address"
        }
      ],
      name: "transfer",
      outputs: [],
      payable: false,
      stateMutability: "nonpayable",
      type: "function",
      signature: "0x79ce9fac"
    },
    {
      constant: false,
      inputs: [
        {
          internalType: "bytes32",
          name: "nameHash",
          type: "bytes32"
        },
        {
          internalType: "address",
          name: "from",
          type: "address"
        },
        {
          internalType: "address",
          name: "to",
          type: "address"
        }
      ],
      name: "transferFrom",
      outputs: [],
      payable: false,
      stateMutability: "nonpayable",
      type: "function",
      signature: "0x82d7bd27"
    },
    {
      constant: false,
      inputs: [
        {
          internalType: "bytes32",
          name: "nameHash",
          type: "bytes32"
        },
        {
          internalType: "address",
          name: "owner",
          type: "address"
        },
        {
          internalType: "uint256",
          name: "expire",
          type: "uint256"
        }
      ],
      name: "updateByDaoProposal",
      outputs: [],
      payable: false,
      stateMutability: "nonpayable",
      type: "function",
      signature: "0x18eb3a50"
    }
  ],
  bytecode:
    "0x608060405234801561001057600080fd5b50604051612a3e380380612a3e8339818101604052602081101561003357600080fd5b81019080805190602001909291905050508080336000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555080600160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550505050612965806100d96000396000f3fe608060405234801561001057600080fd5b5060043610610128576000357c0100000000000000000000000000000000000000000000000000000000900480638a42876b116100bf578063bcf9fcad1161008e578063bcf9fcad146104f6578063c3f7beda14610584578063ce26e78a146105d0578063d2a03b511461061a578063d392eab1146106a757610128565b80638a42876b146103de578063b2e2c99b14610422578063b75c7dc614610470578063b9566b101461049e57610128565b806379ce9fac116100fb57806379ce9fac146102965780637dd56411146102e457806382d7bd27146103525780638549ddd1146103c057610128565b806318eb3a501461012d57806333eeb127146101855780634f9a1fbb146101fa57806357b29ef414610252575b600080fd5b6101836004803603606081101561014357600080fd5b8101908080359060200190929190803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803590602001909291905050506106f1565b005b6101b16004803603602081101561019b57600080fd5b810190808035906020019092919050505061099e565b604051808373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018281526020019250505060405180910390f35b6102506004803603606081101561021057600080fd5b8101908080359060200190929190803573ffffffffffffffffffffffffffffffffffffffff16906020019092919080359060200190929190505050610a3d565b005b6102946004803603602081101561026857600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190505050610e6b565b005b6102e2600480360360408110156102ac57600080fd5b8101908080359060200190929190803573ffffffffffffffffffffffffffffffffffffffff169060200190929190505050610f72565b005b610310600480360360208110156102fa57600080fd5b8101908080359060200190929190505050611256565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b6103be6004803603606081101561036857600080fd5b8101908080359060200190929190803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803573ffffffffffffffffffffffffffffffffffffffff169060200190929190505050611296565b005b6103c8611662565b6040518082815260200191505060405180910390f35b610420600480360360208110156103f457600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff1690602001909291905050506116b0565b005b61046e6004803603604081101561043857600080fd5b8101908080359060200190929190803573ffffffffffffffffffffffffffffffffffffffff1690602001909291905050506117b5565b005b61049c6004803603602081101561048657600080fd5b8101908080359060200190929190505050611a26565b005b6104f4600480360360608110156104b457600080fd5b8101908080359060200190929190803573ffffffffffffffffffffffffffffffffffffffff16906020019092919080359060200190929190505050611c46565b005b6105426004803603604081101561050c57600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff1690602001909291908035906020019092919050505061209e565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b6105ba6004803603604081101561059a57600080fd5b810190808035906020019092919080359060200190929190505050612119565b6040518082815260200191505060405180910390f35b6105d8612442565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b6106506004803603604081101561063057600080fd5b810190808035906020019092919080359060200190929190505050612468565b6040518080602001828103825283818151815260200191508051906020019060200280838360005b83811015610693578082015181840152602081019050610678565b505050509050019250505060405180910390f35b6106af6124c5565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16146107b3576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252600a8152602001807f61646d696e206f6e6c790000000000000000000000000000000000000000000081525060200191505060405180910390fd5b600060026000858152602001908152602001600020905061083f84600360008460000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206124ea90919063ffffffff16565b61089084600360008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206124ea90919063ffffffff16565b6108e184600360008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002061251290919063ffffffff16565b828160000160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508181600101819055507fb2b848c23b147f2d3c11308c74cb0ff81a30b54628e5c73c4d70bf623eb98f728484604051808381526020018273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019250505060405180910390a150505050565b6000806109a9612900565b600260008581526020019081526020016000206040518060400160405290816000820160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020016001820154815250509050806000015181602001519250925050915091565b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663ad9ecd0f30336040518363ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019250505060206040518083038186803b158015610b2c57600080fd5b505afa158015610b40573d6000803e3d6000fd5b505050506040513d6020811015610b5657600080fd5b8101908080519060200190929190505050610bd9576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260158152602001807f6e6f7420616c6c6f77656420746f206d6f64696679000000000000000000000081525060200191505060405180910390fd5b82610be2612900565b600260008381526020019081526020016000206040518060400160405290816000820160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020016001820154815250509050600073ffffffffffffffffffffffffffffffffffffffff16816000015173ffffffffffffffffffffffffffffffffffffffff161480610ca45750428160200151105b610d16576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260098152602001807f6e6f742076616c6964000000000000000000000000000000000000000000000081525060200191505060405180910390fd5b60405180604001604052808573ffffffffffffffffffffffffffffffffffffffff168152602001848152506002600087815260200190815260200160002060008201518160000160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555060208201518160010155905050610df985600360008773ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002061251290919063ffffffff16565b7f5f17f6377b8024fbe396282bbccde46c3c704613385bd2f4b4b3ff955fd56a358585604051808381526020018273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019250505060405180910390a15050505050565b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614610f2e576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252600c8152602001807f6e6f74206163636570746564000000000000000000000000000000000000000081525060200191505060405180910390fd5b80600160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555050565b81610f7b612900565b600260008381526020019081526020016000206040518060400160405290816000820160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200160018201548152505090503373ffffffffffffffffffffffffffffffffffffffff16816000015173ffffffffffffffffffffffffffffffffffffffff1614801561103d5750428160200151115b6110af576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252600a8152602001807f6f776e6572206f6e6c790000000000000000000000000000000000000000000081525060200191505060405180910390fd5b8273ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161415611151576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260108152602001807f7472616e7366657220746f2073656c660000000000000000000000000000000081525060200191505060405180910390fd5b826002600086815260200190815260200160002060000160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055506111b13384866125c5565b7f57972c0bcb114a9f52d3501767c95a65e93901ff48da6677c7399b5593b4e999843385604051808481526020018373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001935050505060405180910390a150505050565b60006002600083815260200190815260200160002060000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050919050565b8173ffffffffffffffffffffffffffffffffffffffff166002600085815260200190815260200160002060000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff161461130457600080fd5b3373ffffffffffffffffffffffffffffffffffffffff16600460008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600085815260200190815260200160002060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1614611415576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252600b8152602001807f6e6f7420616c6c6f77656400000000000000000000000000000000000000000081525060200191505060405180910390fd5b8073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff1614156114b7576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260108152602001807f7472616e7366657220746f2073656c660000000000000000000000000000000081525060200191505060405180910390fd5b600460008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600084815260200190815260200160002060006101000a81549073ffffffffffffffffffffffffffffffffffffffff0219169055806002600085815260200190815260200160002060000160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555061158a8282856125c5565b7f3f8c833a27e9521421e46d68c5a31e603cc465fc4bbff2226b98d964252ebb3f83838333604051808581526020018473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200194505050505060405180910390a1505050565b60006116ab600360003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002061266c565b905090565b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614611772576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252600a8152602001807f61646d696e206f6e6c790000000000000000000000000000000000000000000081525060200191505060405180910390fd5b806000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555050565b816117be612900565b600260008381526020019081526020016000206040518060400160405290816000820160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200160018201548152505090503373ffffffffffffffffffffffffffffffffffffffff16816000015173ffffffffffffffffffffffffffffffffffffffff161480156118805750428160200151115b6118f2576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252600a8152602001807f6f776e6572206f6e6c790000000000000000000000000000000000000000000081525060200191505060405180910390fd5b82600460003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600086815260200190815260200160002060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055507f36a9e0c1da9cdc6d8f4bd4cb261f9ad6a45eb1641a557ead7530fbeff9a26336338486604051808473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001828152602001935050505060405180910390a150505050565b80611a2f612900565b600260008381526020019081526020016000206040518060400160405290816000820160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200160018201548152505090503373ffffffffffffffffffffffffffffffffffffffff16816000015173ffffffffffffffffffffffffffffffffffffffff16148015611af15750428160200151115b611b63576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252600a8152602001807f6f776e6572206f6e6c790000000000000000000000000000000000000000000081525060200191505060405180910390fd5b600460003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600084815260200190815260200160002060006101000a81549073ffffffffffffffffffffffffffffffffffffffff02191690557fc7fb647e59b18047309aa15aad418e5d7ca96d173ad704f1031a2c3d7591734b3384604051808373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018281526020019250505060405180910390a1505050565b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663ad9ecd0f30336040518363ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019250505060206040518083038186803b158015611d3557600080fd5b505afa158015611d49573d6000803e3d6000fd5b505050506040513d6020811015611d5f57600080fd5b8101908080519060200190929190505050611de2576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260158152602001807f6e6f7420616c6c6f77656420746f206d6f64696679000000000000000000000081525060200191505060405180910390fd5b82611deb612900565b600260008381526020019081526020016000206040518060400160405290816000820160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020016001820154815250509050600073ffffffffffffffffffffffffffffffffffffffff16816000015173ffffffffffffffffffffffffffffffffffffffff161480611ead5750428160200151105b611f1f576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260098152602001807f6e6f742076616c6964000000000000000000000000000000000000000000000081525060200191505060405180910390fd5b60006002600087815260200190815260200160002060000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050611f658186886125c5565b60405180604001604052808673ffffffffffffffffffffffffffffffffffffffff168152602001858152506002600088815260200190815260200160002060008201518160000160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550602082015181600101559050507fae53ff61a227b196db64e2dea26e80d455bb2d90fd10372db78b44ace9cb0f62868287604051808481526020018373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001935050505060405180910390a1505050505050565b6000600460008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600083815260200190815260200160002060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905092915050565b6000600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663ad9ecd0f30336040518363ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019250505060206040518083038186803b15801561220a57600080fd5b505afa15801561221e573d6000803e3d6000fd5b505050506040513d602081101561223457600080fd5b81019080805190602001909291905050506122b7576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260158152602001807f6e6f7420616c6c6f77656420746f206d6f64696679000000000000000000000081525060200191505060405180910390fd5b82600073ffffffffffffffffffffffffffffffffffffffff166002600083815260200190815260200160002060000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff161415612391576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260088152602001807f6e6f206f776e657200000000000000000000000000000000000000000000000081525060200191505060405180910390fd5b600060026000868152602001908152602001600020905042816001015410156123d4576123c7844261267d90919063ffffffff16565b81600101819055506123f4565b6123eb84826001015461267d90919063ffffffff16565b81600101819055505b7fe898863b26adf3af54e82709ac1a76136eaaa5f3a7d9b790ce6d539d508e75ff8585604051808381526020018281526020019250505060405180910390a180600101549250505092915050565b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b60606124bd8383600360003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002061269c9092919063ffffffff16565b905092915050565b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b6000806124f784846127da565b91509150811561250c5761250b8482612840565b5b50505050565b600082600001600083815260200190815260200160002054905060008360010180549050148061256857506000811480156125675750818360010160008154811061255957fe5b906000526020600020015414155b5b61257157600080fd5b82600101805490508360000160008481526020019081526020016000208190555082600101829080600181540180825580915050906001820390600052602060002001600090919290919091505550505050565b61261681600360008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206124ea90919063ffffffff16565b61266781600360008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002061251290919063ffffffff16565b505050565b600081600101805490509050919050565b60008082840190508381101561269257600080fd5b8091505092915050565b6060600082141561270157836001018054806020026020016040519081016040528092919081815260200182805480156126f557602002820191906000526020600020905b8154815260200190600101908083116126e1575b505050505090506127d3565b81831061270c578192505b606083830360405190808252806020026020018201604052801561273f5781602001602082028038833980820191505090505b50905060008090506000866001018054905090505b8482870110156127cc578082870110156127a157866001018287018154811061277957fe5b906000526020600020015483838151811061279057fe5b6020026020010181815250506127bf565b60006001028383815181106127b257fe5b6020026020010181815250505b8180600101925050612754565b8293505050505b9392505050565b6000806000846000016000858152602001908152602001600020549050808560010180549050111561282d578385600101828154811061281657fe5b906000526020600020015414819250925050612839565b60008080905092509250505b9250929050565b60008260010160018460010180549050038154811061285b57fe5b90600052602060002001549050600083600101838154811061287957fe5b906000526020600020015490508184600101848154811061289657fe5b9060005260206000200181905550828460000160008481526020019081526020016000208190555083600001600082815260200190815260200160002060009055836001018054806128e457fe5b6001900381819060005260206000200160009055905550505050565b6040518060400160405280600073ffffffffffffffffffffffffffffffffffffffff16815260200160008152509056fea265627a7a723158205e9c688517358859f3c571ed48ab5efc082d323df8c5af98587c263b0135b59264736f6c634300050c0032",
  networks: {
    "1337": {
      address: "0x9C5ac4FE6161dFEb887993ef07acE0eF72466D34"
    }
  }
};
