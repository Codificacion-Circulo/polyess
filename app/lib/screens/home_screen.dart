import 'package:flutter/material.dart';
import 'package:polyess/models/api/users.dart';
import 'package:polyess/providers/login_user.dart';

class HomeScreen extends StatelessWidget {
  const HomeScreen({Key? key, required this.addr}) : super(key: key);
  final String addr;

  @override
  Widget build(BuildContext context) {
    LoginApiProvider loginProvider = LoginApiProvider();
    return SafeArea(
      child: Scaffold(
        appBar: AppBar(
          title: Text('Polyess'),
        ),
        body: Column(
          children: [
            FutureBuilder(
              initialData: Users(),
              future: loginProvider
                  .getMyUser('0x596F08aDAa76889161A98c9Bb79869e7f9518C70'),
              builder: (context, snapshot) {
                if (snapshot.hasData) {
                  return Padding(
                    padding:
                        const EdgeInsets.only(top: 15, left: 30, right: 30),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.center,
                      children: [
                        Row(
                          mainAxisAlignment: MainAxisAlignment.center,
                          children: [
                            Text(
                              loginProvider.userDetails?.user?.username ?? '--',
                              style: TextStyle(
                                color: Colors.amber[100],
                                fontSize: 50,
                                fontWeight: FontWeight.bold,
                              ),
                            ),
                          ],
                        ),
                        SizedBox(
                          height: 15,
                        ),
                        Text(
                          addr,
                          maxLines: 1,
                          overflow: TextOverflow.ellipsis,
                          style: TextStyle(
                            color: Colors.grey,
                            fontSize: 20,
                          ),
                        ),
                        SizedBox(
                          height: 15,
                        ),
                        Card(
                          elevation: 0,
                          color: Color(0xFF242A38),
                          child: Padding(
                            padding: const EdgeInsets.symmetric(vertical: 15),
                            child: Column(
                              children: [
                                Row(
                                  mainAxisAlignment:
                                      MainAxisAlignment.spaceEvenly,
                                  children: [
                                    Column(
                                      mainAxisAlignment:
                                          MainAxisAlignment.center,
                                      children: [
                                        Text(
                                          'Pts.',
                                          style: TextStyle(
                                              color: Colors.white70,
                                              fontWeight: FontWeight.bold,
                                              fontSize: 20),
                                        ),
                                        SizedBox(
                                          height: 12,
                                        ),
                                        Text(
                                          loginProvider.userDetails?.user?.rank
                                                  .toString() ??
                                              '..',
                                          style: TextStyle(
                                            color: Colors.amber[100],
                                            fontWeight: FontWeight.bold,
                                            fontSize: 25,
                                          ),
                                        )
                                      ],
                                    ),
                                    Column(
                                      mainAxisAlignment:
                                          MainAxisAlignment.center,
                                      children: [
                                        Text(
                                          'Wins',
                                          style: TextStyle(
                                              color: Colors.white70,
                                              fontWeight: FontWeight.bold,
                                              fontSize: 20),
                                        ),
                                        SizedBox(
                                          height: 12,
                                        ),
                                        Text(
                                          loginProvider.userDetails?.wins?.wins
                                                  ?.length
                                                  .toString() ??
                                              '..',
                                          style: TextStyle(
                                            color: Colors.amber[100],
                                            fontWeight: FontWeight.bold,
                                            fontSize: 25,
                                          ),
                                        )
                                      ],
                                    ),
                                    Column(
                                      mainAxisAlignment:
                                          MainAxisAlignment.center,
                                      children: [
                                        Text(
                                          'Loses',
                                          style: TextStyle(
                                              color: Colors.white70,
                                              fontWeight: FontWeight.bold,
                                              fontSize: 20),
                                        ),
                                        SizedBox(
                                          height: 12,
                                        ),
                                        Text(
                                          loginProvider.userDetails?.loses
                                                  ?.loses?.length
                                                  .toString() ??
                                              '..',
                                          style: TextStyle(
                                            color: Colors.amber[100],
                                            fontWeight: FontWeight.bold,
                                            fontSize: 25,
                                          ),
                                        )
                                      ],
                                    ),
                                  ],
                                ),
                                SizedBox(
                                  height: 15,
                                ),
                                Row(
                                  mainAxisAlignment:
                                      MainAxisAlignment.spaceEvenly,
                                  children: [
                                    Column(
                                      mainAxisAlignment:
                                          MainAxisAlignment.center,
                                      children: [
                                        Text(
                                          'Tokens',
                                          style: TextStyle(
                                              color: Colors.white70,
                                              fontWeight: FontWeight.bold,
                                              fontSize: 20),
                                        ),
                                        SizedBox(
                                          height: 12,
                                        ),
                                        Text(
                                          loginProvider
                                                  .userDetails?.user?.tokenCount
                                                  .toString() ??
                                              '..',
                                          style: TextStyle(
                                            color: Colors.amber[100],
                                            fontWeight: FontWeight.bold,
                                            fontSize: 25,
                                          ),
                                        )
                                      ],
                                    ),
                                    Column(
                                      mainAxisAlignment:
                                          MainAxisAlignment.center,
                                      children: [
                                        Text(
                                          'NFTs',
                                          style: TextStyle(
                                              color: Colors.white70,
                                              fontWeight: FontWeight.bold,
                                              fontSize: 20),
                                        ),
                                        SizedBox(
                                          height: 12,
                                        ),
                                        Text(
                                          loginProvider.userDetails?.nfts?.nft
                                                  ?.length
                                                  .toString()
                                                  .toString() ??
                                              '..',
                                          style: TextStyle(
                                            color: Colors.amber[100],
                                            fontWeight: FontWeight.bold,
                                            fontSize: 25,
                                          ),
                                        )
                                      ],
                                    ),
                                  ],
                                )
                              ],
                            ),
                          ),
                        )
                      ],
                    ),
                  );
                }
                return CircularProgressIndicator();
              },
            ),
          ],
        ),
      ),
    );
  }
}
