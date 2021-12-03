import 'package:flutter/material.dart';
import 'package:flutter_secure_storage/flutter_secure_storage.dart';
import 'package:polyess/screens/home.dart';
import 'package:polyess/services/wallet_service.dart';

class WalletConnect extends StatelessWidget {
  WalletConnect({Key? key}) : super(key: key);

  final TextEditingController _seedController = TextEditingController();

  @override
  Widget build(BuildContext context) {
    return SafeArea(
      child: Scaffold(
        appBar: AppBar(
          title: Text('Polyess'),
        ),
        body: Padding(
          padding: const EdgeInsets.symmetric(horizontal: 40),
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(
                "Enter wallet seed:",
                style: TextStyle(color: Colors.white),
              ),
              SizedBox(
                height: 20,
              ),
              TextField(
                controller: _seedController,
                decoration: InputDecoration(
                    fillColor: Colors.grey.shade800, filled: true),
              ),
              SizedBox(
                height: 20,
              ),
              Center(
                child: ElevatedButton(
                  onPressed: () async {
                    var address =
                        await WalletService().getAddress(_seedController.text);
                    Navigator.pushReplacement(
                      context,
                      MaterialPageRoute(
                          builder: (context) => Home(addr: address)),
                    );
                  },
                  child: Text('Connect Wallet'),
                ),
              ),
              ElevatedButton(
                onPressed: () async {
                  var address =
                      await FlutterSecureStorage().read(key: 'savedAddr');
                  print(address);
                },
                child: Text('test'),
              )
            ],
          ),
        ),
      ),
    );
  }
}
