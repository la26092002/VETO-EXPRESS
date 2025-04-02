import { Tabs } from "expo-router";
import React, { useEffect } from "react";
import { Platform } from "react-native";
import * as NavigationBar from "expo-navigation-bar";

import { HapticTab } from "@/components/HapticTab";
import { IconSymbol } from "@/components/ui/IconSymbol";
import TabBarBackground from "@/components/ui/TabBarBackground";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { View } from "react-native";
import { Svg, Path, Rect, Use, Pattern, Defs, Image } from "react-native-svg";

//
const ProfileIcon = ({ focused, color }) => {
  const fillColor = focused ? "#003092" : "#868686";

  return (
    <View className="relative">
      {focused && (
        <View className="absolute -left-3 bottom-0">
          <Svg width={24} height={24} viewBox="0 0 15 20">
            <Path
              opacity={0.2}
              fillRule="evenodd"
              clipRule="evenodd"
              d="M9 20C13.9706 20 16.5 11.5 12 8C7.5 4.5 14.9706 0 10 0C5.02944 0 0 6.02944 0 11C0 15.9706 4.02944 20 9 20Z"
              fill="#205781"
            />
          </Svg>
        </View>
      )}
      {/* Human figure on the right */}
      <Svg width={24} height={24} viewBox="0 0 18 18">
        <Path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M5 4C5 6.20914 6.79086 8 9 8C11.2091 8 13 6.20914 13 4C13 1.79086 11.2091 0 9 0C6.79086 0 5 1.79086 5 4ZM8.98334 10C4.26191 10 0.388259 12.4265 0.000651684 17.1992C-0.0204617 17.4592 0.476712 18 0.727502 18H17.2467C17.9979 18 18.0096 17.3955 17.9979 17.2C17.7049 12.2932 13.7712 10 8.98334 10Z"
          fill={fillColor}
        />
      </Svg>
    </View>
  );
};

const ServiceIcon = ({ focused, color }) => {
  const fillColor = focused ? "#003092" : "#868686";

  return (
    <View className="relative">
      {focused && (
        <View className="absolute -left-3 bottom-0">
          <Svg width={24} height={24} viewBox="0 0 15 20">
            <Path
              opacity={0.2}
              fillRule="evenodd"
              clipRule="evenodd"
              d="M9 20C13.9706 20 16.5 11.5 12 8C7.5 4.5 14.9706 0 10 0C5.02944 0 0 6.02944 0 11C0 15.9706 4.02944 20 9 20Z"
              fill={fillColor}
            />
          </Svg>
        </View>
      )}
      {/* Human figure on the right */}
      <Svg width="24" height="24" viewBox="0 0 16 18" fill="none">
        <Path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M0 1.6C0 1.03995 0 0.759921 0.108993 0.546009C0.204867 0.357847 0.357847 0.204867 0.546009 0.108993C0.759921 0 1.03995 0 1.6 0H14.4C14.9601 0 15.2401 0 15.454 0.108993C15.6422 0.204867 15.7951 0.357847 15.891 0.546009C16 0.759921 16 1.03995 16 1.6V16.4C16 16.9601 16 17.2401 15.891 17.454C15.8431 17.5481 15.7809 17.6334 15.7071 17.7071L14 16L12.5 17.5L11 16L9.5 17.5L8 16L6.5 17.5L5 16L3.5 17.5L2 16L0.292893 17.7071C0.219144 17.6334 0.15693 17.5481 0.108993 17.454C0 17.2401 0 16.9601 0 16.4V1.6ZM2.0545 2.273C2 2.37996 2 2.51997 2 2.8V3.2C2 3.48003 2 3.62004 2.0545 3.727C2.10243 3.82108 2.17892 3.89757 2.273 3.9455C2.37996 4 2.51997 4 2.8 4H13.2C13.48 4 13.62 4 13.727 3.9455C13.8211 3.89757 13.8976 3.82108 13.9455 3.727C14 3.62004 14 3.48003 14 3.2V2.8C14 2.51997 14 2.37996 13.9455 2.273C13.8976 2.17892 13.8211 2.10243 13.727 2.0545C13.62 2 13.48 2 13.2 2H2.8C2.51997 2 2.37996 2 2.273 2.0545C2.17892 2.10243 2.10243 2.17892 2.0545 2.273Z"
          fill={fillColor}
        />
      </Svg>
    </View>
  );
};
const HomeIcon = ({ focused, color }) => {
  const fillColor = focused ? "#003092" : "#868686";

  return (
    <View className="relative">
      {focused && (
        <View className="absolute -left-3 bottom-0">
          <Svg width={24} height={24} viewBox="0 0 15 20">
            <Path
              opacity={0.2}
              fillRule="evenodd"
              clipRule="evenodd"
              d="M9 20C13.9706 20 16.5 11.5 12 8C7.5 4.5 14.9706 0 10 0C5.02944 0 0 6.02944 0 11C0 15.9706 4.02944 20 9 20Z"
              fill={fillColor}
            />
          </Svg>
        </View>
      )}
      {/* Human figure on the right */}
      <Svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <Rect
          width="20"
          height="20"
          fill="url(#pattern0_123_4312)"
          fill-opacity="0.95"
        />
        <Defs>
          <Pattern
            id="pattern0_123_4312"
            patternContentUnits="objectBoundingBox"
            width="1"
            height="1"
          >
            <Use xlinkHref="#image0_123_4312" transform="scale(0.00390625)" />
          </Pattern>
          <Image
            id="image0_123_4312"
            width="256"
            height="256"
            preserveAspectRatio="none"
            href="data:image/png;base64,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"
          />
        </Defs>
      </Svg>
    </View>
  );
};
const SearchIcon = ({ focused, color }) => {
  const fillColor = focused ? "#003092" : "#868686";

  return (
    <View className="relative">
      {focused && (
        <View className="absolute -left-3 bottom-0">
          <Svg width={24} height={24} viewBox="0 0 15 20">
            <Path
              opacity={0.2}
              fillRule="evenodd"
              clipRule="evenodd"
              d="M9 20C13.9706 20 16.5 11.5 12 8C7.5 4.5 14.9706 0 10 0C5.02944 0 0 6.02944 0 11C0 15.9706 4.02944 20 9 20Z"
              fill={fillColor}
            />
          </Svg>
        </View>
      )}
      {/* Human figure on the right */}
      <Svg width="16" height="17" viewBox="0 0 16 17" fill="none">
        <Path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M7 14C3.13401 14 0 10.866 0 7C0 3.13401 3.13401 0 7 0C10.866 0 14 3.13401 14 7C14 8.82763 13.2996 10.4917 12.1525 11.7383L15.7071 15.2929C16.0976 15.6834 16.0976 16.3166 15.7071 16.7071C15.3166 17.0976 14.6834 17.0976 14.2929 16.7071L10.594 13.0082C9.54341 13.638 8.31399 14 7 14ZM7 12C9.76142 12 12 9.76142 12 7C12 4.23858 9.76142 2 7 2C4.23858 2 2 4.23858 2 7C2 9.76142 4.23858 12 7 12Z"
          fill={fillColor}
        />
      </Svg>
    </View>
  );
};
export default function TabLayout() {
  const colorScheme = useColorScheme();
  useEffect(() => {
    // Hide the navigation bar on Android
    NavigationBar.setVisibilityAsync("hidden");
  }, []);

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            // Use a transparent background on iOS to show the blur effect
            position: "absolute",
          },
          default: {
            paddingHorizontal: 32, // Equivalent to `px-8` (8 * 4 = 32)
            paddingVertical: 12, // Equivalent to `py-3` (3 * 4 = 12)
            borderTopWidth: 1, // Equivalent to `border-t`
            borderTopColor: "#e5e7eb", // Equivalent to `border-gray-200`
          },
        }),
      }}
    >
      <Tabs.Screen
        name="deliveryTo"
        options={{
          title: "Home",
          tabBarIcon: ({ color, focused }) => (
            <HomeIcon focused={focused} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="topService"
        options={{
          title: "Search",
          tabBarIcon: ({ color, focused }) => (
            <SearchIcon focused={focused} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="deliveryToo"
        options={{
          title: "Orders",
          tabBarIcon: ({ color, focused }) => (
            <ServiceIcon focused={focused} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="createAccount"
        options={{
          title: "Profile",
          tabBarIcon: ({ color, focused }) => (
            <ProfileIcon focused={focused} color={color} />
          ),
        }}
      />
      {/* comment me  */}
      {/* <Tabs.Screen
        name="service"
        options={{
          href: null, // This prevents the tab from showing in the tab bar
          // Alternatively, you can use `headerShown: false` if you want to hide just the header
        }}
      />
      <Tabs.Screen
        name="accountSetting"
        options={{
          href: null, // This prevents the tab from showing in the tab bar
          // Alternatively, you can use `headerShown: false` if you want to hide just the header
        }}
      />
      <Tabs.Screen
        name="service-details"
        options={{
          href: null, // This prevents the tab from showing in the tab bar
          // Alternatively, you can use `headerShown: false` if you want to hide just the header
        }}
      /> */}
    </Tabs>
  );
}
