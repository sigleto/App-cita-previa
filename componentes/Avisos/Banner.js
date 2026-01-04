import React from "react";
import { View } from "react-native";
import { BannerAd, BannerAdSize } from "react-native-google-mobile-ads";

const adUnitId = __DEV__
  ? "ca-app-pub-3940256099942544/6300978111" // TEST
  : "ca-app-pub-6921150380725872/8959961143"; // REAL

const BannerAdComponent = () => {
  return (
    <View style={{ alignItems: "center", marginVertical: 10 }}>
      <BannerAd
        unitId={adUnitId}
        size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
        requestOptions={{
          requestNonPersonalizedAdsOnly: true,
        }}
      />
    </View>
  );
};

export default BannerAdComponent;
