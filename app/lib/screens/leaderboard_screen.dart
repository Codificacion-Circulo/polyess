import 'package:flutter/material.dart';
import 'package:polyess/providers/users.dart';

class LeaderBoardSceen extends StatelessWidget {
  const LeaderBoardSceen({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    UsersApiProvider userProvider = UsersApiProvider();
    return SafeArea(
      child: Scaffold(
        appBar: AppBar(
          title: Text('Polyess'),
        ),
        body: FutureBuilder(
            initialData: [],
            future: userProvider.fetchUsers(),
            builder: (BuildContext context, AsyncSnapshot snapshot) {
              if (snapshot.hasData) {
                return Padding(
                  padding: const EdgeInsets.only(top: 20, left: 20, right: 20),
                  child: ListView.builder(
                    itemCount: userProvider.users?.length ?? 0,
                    itemBuilder: (context, index) {
                      return Card(
                        elevation: 0,
                        color: Color(0xFF242A38),
                        child: ListTile(
                          title: Text(
                            userProvider.users![index].username!,
                            style: TextStyle(
                              color: Colors.lime[50],
                              fontWeight: FontWeight.bold,
                            ),
                            textAlign: TextAlign.center,
                          ),
                          leading: Container(
                            height: 35,
                            width: 35,
                            decoration: BoxDecoration(
                                color: Colors.amber[200],
                                borderRadius: BorderRadius.circular(5)),
                            child: Center(
                              child: Text(
                                '#${index + 1}',
                                style: TextStyle(
                                  fontWeight: FontWeight.bold,
                                ),
                              ),
                            ),
                          ),
                          trailing: Text(
                            userProvider.users![index].rank.toString() +
                                ' pts.',
                            style: TextStyle(
                              color: Colors.orange[100],
                              fontWeight: FontWeight.bold,
                            ),
                          ),
                        ),
                      );
                    },
                  ),
                );
              }
              return Center(child: CircularProgressIndicator());
            }),
      ),
    );
  }
}
