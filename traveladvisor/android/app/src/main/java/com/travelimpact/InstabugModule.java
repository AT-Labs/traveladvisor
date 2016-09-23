package com.travelimpact;

import android.widget.Toast;

import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import com.instabug.library.Instabug;

import java.util.Map;

public class InstabugModule extends ReactContextBaseJavaModule {

  public InstabugModule(ReactApplicationContext reactContext) {
    super(reactContext);
  }

  @Override
  public String getName() {
    return "InstabugInvoker";
  }

  @ReactMethod
  public void invoke() {
    Instabug.invoke();
  }
}