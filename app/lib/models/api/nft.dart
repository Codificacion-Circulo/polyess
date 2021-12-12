class Nft {
  final String? gameid;

  Nft({this.gameid});

  factory Nft.fromJson(Map<String, dynamic> json) {
    return Nft(
      gameid: json['gameId'],
    );
  }
}

class NftList {
  final List<Nft>? nft;

  NftList({this.nft});

  factory NftList.fromJson(List<dynamic> json) {
    final nftList = json.map((i) => Nft.fromJson(i)).toList();
    return NftList(
      nft: nftList,
    );
  }
}
