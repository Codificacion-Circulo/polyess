import 'package:flutter/material.dart';
import 'profile_stats.dart';
class WalletConnect extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return SafeArea(
      child: Scaffold(
        appBar: AppBar(
          title: Text('Polyess'),
        ),
        body: Column(
          mainAxisAlignment: MainAxisAlignment.spaceEvenly,
          children: [
            TextField(
              decoration:
                  InputDecoration(hintText: 'Please enter the seed phrase'),
            ),
            ElevatedButton(onPressed: () {
              //Wallet Connect Code Here
              Navigator.push(context, MaterialPageRoute(builder: (context)=>Profile_Stats()));
            }, child: Text('Connect Wallet')),
          ],
        ),
      ),
    );
  }
}
