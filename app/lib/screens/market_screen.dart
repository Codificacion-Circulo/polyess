import 'dart:developer';

import 'package:flutter/material.dart';
import 'package:polyess/models/style.dart';
import 'wallet_connect.dart';
import 'package:polyess/services/wallet_service.dart';
import 'package:polyess/services/web3.dart';
import 'package:polyess/services/nfts_api.dart';
import 'package:url_launcher/url_launcher.dart';

class MarketPlaceScreen extends StatefulWidget {
  MarketPlaceScreen({Key? key}) : super(key: key);

  @override
  State<MarketPlaceScreen> createState() => _MarketPlaceScreenState();
}

const contract = "61b5d2a26f91e091b233e4ea";
const String _url = 'https://polyess.netlify.app/';

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
          crossAxisCount: 2,
          children: List.generate(3, (index) {
            return GestureDetector(
              child: Container(
                  decoration: BoxDecoration(
                      color: Colors.amberAccent[100],
                      borderRadius: BorderRadius.all(Radius.circular(15))),
                  margin: EdgeInsets.all(10.0),
                  child: Image.network(
                      "https://gateway.pinata.cloud/ipfs/QmPWCagNgzp5P2TigD471JMr2bzjkhsjLEQFHTR4hAqnrg/1.png")),
              onTap: () async {
                // _launchURL();
                // log("${await NFTApi().validBuy("61b5d2326f91e091b233e4e7")}");
                if (await NFTApi().validBuy("61b5d2326f91e091b233e4e7")) {
                  log("message");
                } else {
                  log("message2");
                }
                showModalBottomSheet(
                  backgroundColor: bgColor,
                  context: context,
                  builder: (BuildContext context) {
                    return Padding(
                        padding: const EdgeInsets.all(15.0),
                        child: NFTApi().validBuy("61b5d2a26f91e091b233e4ea")
                            ? Padding(
                                padding: const EdgeInsets.all(15.0),
                                child: Row(
                                  mainAxisAlignment:
                                      MainAxisAlignment.spaceEvenly,
                                  children: [
                                    ElevatedButton(
                                      style: ElevatedButton.styleFrom(
                                          shape: RoundedRectangleBorder(
                                              borderRadius:
                                                  BorderRadius.circular(15)),
                                          minimumSize: Size(75, 75)),
                                      onPressed: () {},
                                      child: Text(
                                        'Buy',
                                        style: textStyle1,
                                      ),
                                    ),
                                    ElevatedButton(
                                      style: ElevatedButton.styleFrom(
                                          shape: RoundedRectangleBorder(
                                              borderRadius:
                                                  BorderRadius.circular(15)),
                                          minimumSize: Size(75, 75)),
                                      onPressed: () {},
                                      child: Text('Sell', style: textStyle1),
                                    ),
                                  ],
                                ),
                              )
                            : ElevatedButton(
                                style: ElevatedButton.styleFrom(
                                    shape: RoundedRectangleBorder(
                                        borderRadius:
                                            BorderRadius.circular(15)),
                                    minimumSize: Size(75, 75)),
                                onPressed: null,
                                child:
                                    Text('Owned By Someone', style: textStyle1),
                              ));
                  },
                );
              },
            );
          }),
        ));
  }
}

// showModalBottomSheet(
//               backgroundColor: bgColor,
//               context: context,
//               builder: (BuildContext context) {
//                 return Padding(
//                   padding: const EdgeInsets.all(15.0),
//                   child: address == contractAddress
//                       ? Padding(
//                           padding: const EdgeInsets.all(15.0),
//                           child: Row(
//                             mainAxisAlignment: MainAxisAlignment.spaceEvenly,
//                             children: [
//                               ElevatedButton(
//                                 style: ElevatedButton.styleFrom(
//                                     shape: RoundedRectangleBorder(
//                                         borderRadius:
//                                             BorderRadius.circular(15)),
//                                     minimumSize: Size(75, 75)),
//                                 onPressed: () {},
//                                 child: Text(
//                                   'Buy',
//                                   style: textStyle1,
//                                 ),
//                               ),
//                               ElevatedButton(
//                                 style: ElevatedButton.styleFrom(
//                                     shape: RoundedRectangleBorder(
//                                         borderRadius:
//                                             BorderRadius.circular(15)),
//                                     minimumSize: Size(75, 75)),
//                                 onPressed: () {},
//                                 child: Text('Sell', style: textStyle1),
//                               ),
//                             ],
//                           ),
//                         )
                      // : ElevatedButton(
                      //     style: ElevatedButton.styleFrom(
                      //         shape: RoundedRectangleBorder(
                      //             borderRadius: BorderRadius.circular(15)),
                      //         minimumSize: Size(75, 75)),
                      //     onPressed: null,
                      //     child: Text('Owned By Someone', style: textStyle1),
                      //   ),
//                 );
//               },
//             );