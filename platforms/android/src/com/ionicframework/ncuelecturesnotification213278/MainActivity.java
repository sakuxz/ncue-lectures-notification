/*
       Licensed to the Apache Software Foundation (ASF) under one
       or more contributor license agreements.  See the NOTICE file
       distributed with this work for additional information
       regarding copyright ownership.  The ASF licenses this file
       to you under the Apache License, Version 2.0 (the
       "License"); you may not use this file except in compliance
       with the License.  You may obtain a copy of the License at

         http://www.apache.org/licenses/LICENSE-2.0

       Unless required by applicable law or agreed to in writing,
       software distributed under the License is distributed on an
       "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
       KIND, either express or implied.  See the License for the
       specific language governing permissions and limitations
       under the License.
 */

package com.ionicframework.ncuelecturesnotification213278;

import android.app.ActivityManager;
import android.app.AlarmManager;
import android.app.AlertDialog;
import android.app.PendingIntent;
import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.os.Bundle;
import android.util.Log;
import android.widget.Toast;
import android.webkit.JavascriptInterface;

import org.apache.cordova.*;

import java.io.BufferedInputStream;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import java.util.Calendar;

//測試notification
public class MainActivity extends CordovaActivity {
    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        // Set by <content src="index.html" /> in config.xml
        loadUrl(launchUrl);
        Toast.makeText(this, "oor top top top top top", Toast.LENGTH_SHORT).show();

        if (NCUELecturesService.isRunning) {
            Log.v("NCUEService", "service is running");
        } else {
            Log.v("NCUEService", "service is not running");
            Intent it = new Intent(this, NCUELecturesService.class);
            PendingIntent pt = PendingIntent.getService(this, 0, it, 0);
            AlarmManager am = (AlarmManager) getSystemService(Context.ALARM_SERVICE);
            am.setRepeating(AlarmManager.RTC_WAKEUP, Calendar.getInstance().getTimeInMillis(), 30 * 60 * 1000, pt);
            startService(it);
        }


    }

}
