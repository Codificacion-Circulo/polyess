import 'package:flutter/services.dart';
import 'dart:developer';
import 'package:flutter/material.dart';
import 'package:web3dart/web3dart.dart';
import 'package:http/http.dart' as http;
import 'dart:typed_data';

class ETHHome extends StatefulWidget {
  const ETHHome({Key? key}) : super(key: key);

  @override
  State<ETHHome> createState() => _ETHHomeState();
}

const contractAddress = "0xc34a11cf9399c5eac1448f519578427ac0b55c3e";

class _ETHHomeState extends State<ETHHome> {
  late http.Client webClient = http.Client();
  late Web3Client ethclient = Web3Client(
      "https://rinkeby.infura.io/v3/752e6440e05b49e789eddfb9ca3e5c52",
      webClient);
  final myAdress = "0x15923Daf6ac663991c5E7Ca41f2cFa67efdB1080";

  var mydata;
  @override
  void intiState() {
    super.initState();
    http.Client webClient = http.Client();
    Web3Client ethclient = Web3Client(
        "https://rinkeby.infura.io/v3/752e6440e05b49e789eddfb9ca3e5c52",
        webClient);
  }

  Future<DeployedContract> loadContract() async {
    String abi = await rootBundle.loadString("contract/abi.json");

    final contract = DeployedContract(ContractAbi.fromJson(abi, "ethwalltrial"),
        EthereumAddress.fromHex(contractAddress));
    return contract;
  }

  Future<List<dynamic>> query(String function, List<dynamic> args) async {
    final contract = await loadContract();
    final ethFunction = contract.function(function);
    final result = await ethclient.call(
        sender: EthereumAddress.fromHex(myAdress),
        contract: contract,
        function: ethFunction,
        params: args);
    return result;
  }

  Future<void> balanceOf(String add) async {
    EthereumAddress address = EthereumAddress.fromHex(add);
    List<dynamic> result =
        await query("balanceOf", [address, BigInt.from(0).toUnsigned(256)]);
    mydata = result[0];
    log('data : $mydata');
  }

  @override
  Widget build(BuildContext context) {
    return SafeArea(
      child: Scaffold(
        body: ElevatedButton(
            onPressed: () {
              balanceOf(myAdress);
            },
            child: Text("data")),
      ),
    );
  }
}
