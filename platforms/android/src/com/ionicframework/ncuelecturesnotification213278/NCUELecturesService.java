package com.ionicframework.ncuelecturesnotification213278;

import android.app.Notification;
import android.app.NotificationManager;
import android.app.PendingIntent;
import android.app.Service;
import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.os.IBinder;
import android.util.Log;
import android.widget.Toast;

import org.json.JSONArray;
import org.json.JSONObject;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.Calendar;
import java.util.Date;

/**
 * Created by user on 2015/9/20.
 */
public class NCUELecturesService extends Service {

    static boolean isRunning = false;

    @Override
    public IBinder onBind(Intent intent) {
        return null;
    }

    @Override
    public void onCreate() {
        super.onCreate();
        isRunning = true;
    }

    @Override
    public void onDestroy() {
        super.onDestroy();
        isRunning = false;
    }

    SharedPreferences sp;
    String lastTimestamp;

    @Override
    public int onStartCommand(Intent intent, int flags, int startId) {
        isRunning = true;
        Log.v("NCUEService", "service");
        sp = getApplicationContext().getSharedPreferences("HTML5Data", Context.MODE_PRIVATE);
        lastTimestamp = sp.getString("t", "1");
        if (lastTimestamp == "1") {
            Date d = new Date();
            lastTimestamp = String.valueOf(d.getTime());
        }
        Thread t = new Thread(new Runnable() {
            @Override
            public void run() {
                try {
                    URL url = new URL("http://nodejs-ncuecsie106.rhcloud.com?t=" + lastTimestamp);
                    HttpURLConnection URLConn = (HttpURLConnection) url.openConnection();
                    URLConn.setRequestProperty(
                            "User-agent",
                            "Mozilla/5.0 (Windows; U; Windows NT 6.0; zh-TW; rv:1.9.1.2) "
                                    + "Gecko/20090729 Firefox/3.5.2 GTB5 (.NET CLR 3.5.30729)");
                    URLConn.setRequestProperty("Accept",
                            "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8");
                    URLConn.setRequestProperty("Accept-Language",
                            "zh-tw,en-us;q=0.7,en;q=0.3");
                    URLConn.setRequestProperty("Accept-Charse",
                            "Big5,utf-8;q=0.7,*;q=0.7");

                    URLConn.setDoInput(true);
                    URLConn.setDoOutput(true);
                    URLConn.connect();
                    URLConn.getOutputStream().flush();
                    BufferedReader in = new BufferedReader(new InputStreamReader(URLConn.getInputStream()));
                    String temp, line = "";
                    while ((temp = in.readLine()) != null) {
                        line += temp;
                    }
                    Log.v("NCUEService", line);
                    JSONArray newLectures = new JSONArray(line);
                    if (newLectures.length() > 0) {
                        String info = "";
                        for (int i = 0; i < newLectures.length(); i++) {
                            JSONObject item = newLectures.getJSONObject(i);
                            info += item.getString("title") + " ";
                        }
                        Notification nf = new Notification(R.drawable.icon, "新講座通知", System.currentTimeMillis());
                        Intent it = new Intent(NCUELecturesService.this, MainActivity.class);
                        PendingIntent pi = PendingIntent.getActivity(NCUELecturesService.this, 0, it, 0);
                        nf.setLatestEventInfo(getApplicationContext(), newLectures.length() + "個新通識講座", info, pi);
                        NotificationManager nm = (NotificationManager) NCUELecturesService.this.getSystemService(Context.NOTIFICATION_SERVICE);
                        nm.notify(0, nf);
                    }
                    String now = String.valueOf((new java.util.Date()).getTime());
                    sp.edit().putString("t", now);
                    sp.edit().commit();
                } catch (Exception e) {
                    e.printStackTrace();
                    Log.v("NCUEService", e.getMessage());
                }
            }
        });
        t.start();
        return super.onStartCommand(intent, flags, startId);
    }
}
