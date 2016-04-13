package org.apache.cordova.myplugin;

import android.app.Activity;
import android.content.Context;
import android.content.SharedPreferences;
import android.util.Log;
import android.widget.Toast;

import org.apache.cordova.CordovaActivity;
import org.apache.cordova.CordovaInterface;
import org.apache.cordova.CordovaPlugin;
import org.apache.cordova.CallbackContext;

import org.apache.cordova.CordovaWebView;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

/**
 * This class echoes a string called from JavaScript.
 */
public class MyCode extends CordovaPlugin {

    @Override
    public void initialize(CordovaInterface cordova, CordovaWebView webView) {
        super.initialize(cordova, webView);
        // your init code here
    }


    @Override
    public boolean execute(String action, JSONArray args, CallbackContext callbackContext) throws JSONException {
        if (action.equals("showToast")) {
            String message = args.getString(0);
            this.showToast(message, callbackContext);
            return true;
        }else if (action.equals("storeSharedPreferences")) {
            this.storeSharedPreferences(args.getString(0),args.getString(1), callbackContext);
            return true;
        }
        return false;
    }

    private void showToast(String message, CallbackContext callbackContext) {
        if (message != null && message.length() > 0) {
            Toast.makeText(this.cordova.getActivity(),message,Toast.LENGTH_SHORT).show();
            callbackContext.success(message);
        } else {
            callbackContext.error("Expected one non-empty string argument.");
        }
    }
    private void storeSharedPreferences(String key,String value, CallbackContext callbackContext) {
            SharedPreferences pref = cordova.getActivity().getSharedPreferences("HTML5Data", Context.MODE_PRIVATE);
            SharedPreferences.Editor preEdt = pref.edit();
            preEdt.putString(key, value);
            preEdt.commit();
            Log.v("NNNN","saved "+value);
            callbackContext.success("success!!!");
    }
}