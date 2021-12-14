import 'dart:convert';
import 'dart:developer';

import 'package:http/http.dart' as http;

import 'package:polyess/models/constants.dart';

class NFTApi {
  final url = apiUrl + '/nfts';
  var data;
  var contract = '61b5d2a26f91e091b233e4ea';
  // Future fetchNTFOwner() async {
  //   final response = await http.get(Uri.parse(url));

  //   if (response.statusCode == 200) {
  //     data = jsonDecode(response.body.toString());
  //     contract = data[0]["owner"].toString();
  //     log("$contract");
  //     return contract;
  //   } else {
  //     throw Exception('Failed');
  //   }
  // }

  validBuy(String person) {
    if (person == contract) {
      log("$contract $person can buy");
      return true;
    } else {
      log("$contract $person cannot buy");
      return false;
    }
  }
}
