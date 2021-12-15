import 'dart:convert';
import 'dart:developer';

import 'package:http/http.dart' as http;

import 'package:polyess/models/constants.dart';

class NFTApi {
  final url1 = apiUrl + '/nfts';

  var data;
  var response;
  var contract = '61b5d2a26f91e091b233e4ea';
  Future getDescription(index) async {
    final response = await http.get(Uri.parse(url1));

    if (response.statusCode == 200) {
      data = jsonDecode(response.body.toString());
      return (" ${data[index]["description"].toString()}");
    } else {
      throw Exception('Failed');
    }
  }

  Future getName(index) async {
    final response = await http.get(Uri.parse(url1));

    if (response.statusCode == 200) {
      data = jsonDecode(response.body.toString());
      return (" ${data[index]["name"].toString()}");
    } else {
      throw Exception('Failed');
    }
  }

  Future getRank(index) async {
    final response = await http.get(Uri.parse(url1));

    if (response.statusCode == 200) {
      data = jsonDecode(response.body.toString());
      return (" ${data[index]["attributes"]["rank"].toString()}");
    } else {
      throw Exception('Failed');
    }
  }

  Future getCountry(index) async {
    final response = await http.get(Uri.parse(url1));

    if (response.statusCode == 200) {
      data = jsonDecode(response.body.toString());
      return (" ${data[index]["attributes"]["country "].toString()}");
    } else {
      throw Exception('Failed');
    }
  }

  validBuy(String person) {
    if (person == contract) {
      log("$contract $person can buy");
      return true;
    } else {
      log("$contract $person cannot buy");
      return false;
    }
  }

//   Future<String> getDesciption(index) async {
//     response = await http.get(Uri.parse("${url2}+index"));
//     data = jsonDecode(response.toString());
//     return data[0];
//   }
// }
}
