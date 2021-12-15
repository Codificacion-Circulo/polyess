import 'package:flutter/material.dart';
import 'package:polyess/models/style.dart';
import 'wallet_connect.dart';
import 'package:polyess/services/wallet_service.dart';
import 'dart:convert';
import 'package:polyess/services/nfts_api.dart';
import 'package:url_launcher/url_launcher.dart';
import 'package:http/http.dart' as http;
import 'package:polyess/services/nfts_api.dart';

class MarketPlaceScreen extends StatefulWidget {
  MarketPlaceScreen({Key? key}) : super(key: key);

  @override
  State<MarketPlaceScreen> createState() => _MarketPlaceScreenState();
}

const contract = "61b5d2a26f91e091b233e4ea";
const String _url = 'https://polyess.netlify.app/';
var data1;
var data2;
var data3;
var data4;

class _MarketPlaceScreenState extends State<MarketPlaceScreen> {
  // Future<String> getAdd() async {
  //   return address = await WalletService().getSavedAddr();
  // }
  void _launchURL() async {
    if (!await launch(_url)) throw 'Could not launch $_url';
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        appBar: AppBar(
          title: Text('Polyess'),
          actions: [
            IconButton(
                onPressed: () {
                  WalletService().clearData();
                  Navigator.pushReplacement(
                    context,
                    MaterialPageRoute(
                      builder: (context) => WalletConnect(),
                    ),
                  );
                },
                icon: Icon(
                  Icons.logout,
                  color: Colors.white,
                ))
          ],
        ),
        body: GridView.count(
          childAspectRatio: 0.75,
          crossAxisCount: 2,
          children: List.generate(35, (index) {
            return GestureDetector(
              child: Container(
                  decoration: BoxDecoration(
                      color: Colors.amberAccent.withOpacity(0.1),
                      borderRadius: BorderRadius.all(Radius.circular(15))),
                  margin: EdgeInsets.all(10.0),
                  child: Image.network(
                    "https://gateway.pinata.cloud/ipfs/QmNNhNXtnNaWjuFdR52KZnASBTKmfZ86dHDHSC9aJ2k49R/${index + 1}.png",
                    loadingBuilder: (BuildContext context, Widget child,
                        ImageChunkEvent? loadingProgress) {
                      if (loadingProgress == null) {
                        return child;
                      } else {
                        return Center(
                            child: CircularProgressIndicator(
                          value: loadingProgress.expectedTotalBytes != null
                              ? loadingProgress.cumulativeBytesLoaded /
                                  loadingProgress.expectedTotalBytes!
                              : null,
                        ));
                      }
                    },
                  )),
              onTap: () async {
                data1 = await NFTApi().getDescription(index);
                data2 = await NFTApi().getName(index);
                data3 = await NFTApi().getRank(index);
                data4 = await NFTApi().getCountry(index);
                // log("${await NFTApi().validBuy("61b5d2326f91e091b233e4e7")}");
                // if (await NFTApi().validBuy("61b5d2326f91e091b233e4e7")) {
                // } else {}
                showModalBottomSheet(
                  backgroundColor: Colors.grey[900],
                  context: context,
                  builder: (BuildContext context) {
                    return Padding(
                      padding: const EdgeInsets.all(10.0),
                      child: Column(
                        mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                        children: [
                          Text("Name : $data2", style: textStyle1),
                          Text(
                            "Description : $data1",
                            style: textStyle1,
                          ),
                          Row(
                            mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                            children: [
                              Text(
                                "Country : $data4",
                                style: textStyle1,
                              ),
                              Text(
                                "Rank : $data3",
                                style: textStyle1,
                              )
                            ],
                          ),
                          ElevatedButton(
                              style: ButtonStyle(
                                  backgroundColor: MaterialStateProperty.all(
                                      Color(0xFFD1996D))),
                              onPressed: () {
                                _launchURL();
                              },
                              child: Text(
                                'View on Site',
                                style: textStyle1,
                              ))
                        ],
                      ),
                    );
                  },
                );
              },
            );
          }),
        ));
  }
}
