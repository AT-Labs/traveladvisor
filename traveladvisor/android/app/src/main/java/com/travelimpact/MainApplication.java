package com.travelimpact;

import android.app.Application;
import android.util.Log;

import com.facebook.react.ReactApplication;
import com.facebook.react.ReactInstanceManager;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;

import java.util.Arrays;
import java.util.List;
import com.instabug.library.Instabug;
import com.instabug.library.IBGInvocationEvent;
import com.instabug.library.Feature.State;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    protected boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
          new InstabugPackage()
      );
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
      return mReactNativeHost;
  }

  @Override
  public void onCreate() {
      super.onCreate();
      new Instabug.Builder(this, "")
                    .setInvocationEvent(IBGInvocationEvent.IBGInvocationEventNone)
                    .setInAppMessagingState(State.DISABLED)
                    .setPushNotificationState(State.DISABLED)
                    .build();
  }
}
