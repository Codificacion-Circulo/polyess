import 'package:flutter/material.dart';

import 'wallet_connect.dart';

class Home extends StatelessWidget {
  const Home({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return SafeArea(
      child: Scaffold(
        appBar: AppBar(
          title: Text('Polyess'),
        ),
        body: Column(mainAxisAlignment: MainAxisAlignment.spaceEvenly,
          children: [
            Container(
              child: Text(
                  'basic intro to the app including blockchain wallet integration etc etc'),
            ),
            ElevatedButton(onPressed: () {
              Navigator.push(context,
                  MaterialPageRoute(builder: (context) => WalletConnect()));
            }, child: Text('Lets Get Started!'))
          ],
        ),
      ),
    );
  }
}
