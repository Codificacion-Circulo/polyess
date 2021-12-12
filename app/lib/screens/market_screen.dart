import 'package:flutter/material.dart';
import 'package:polyess/models/style.dart';
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
    return SafeArea(
      child: Scaffold(
          body: Padding(
        padding: const EdgeInsets.only(top: 30, right: 30, left: 20),
        child: Column(
          mainAxisSize: MainAxisSize.min,
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              'NFT Market',
              style: TextStyle(
                color: Colors.white,
                fontSize: 30,
                fontWeight: FontWeight.bold,
              ),
              textAlign: TextAlign.left,
            ),
            SizedBox(
              height: 20,
            ),
            Expanded(
              child: GridView.count(
                crossAxisCount: 2,
                children: List.generate(3, (index) {
                  return Padding(
                    padding: const EdgeInsets.all(5.0),
                    child: Container(
                      decoration: BoxDecoration(
                          color: textColor,
                          borderRadius: BorderRadius.circular(10)),
                      child: Padding(
                        padding: const EdgeInsets.all(5.0),
                        child: Image.network(
                          "https://gateway.pinata.cloud/ipfs/QmPWCagNgzp5P2TigD471JMr2bzjkhsjLEQFHTR4hAqnrg/1.png",
                          fit: BoxFit.cover,
                        ),
                      ),
                    ),
                  );
                }),
              ),
            ),
          ],
        ),
      )),
    );
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