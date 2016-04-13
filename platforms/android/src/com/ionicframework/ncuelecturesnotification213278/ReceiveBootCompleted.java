package com.ionicframework.ncuelecturesnotification213278;

import android.app.AlarmManager;
import android.app.PendingIntent;
import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;

import java.util.Calendar;

/**
 * Created by user on 2015/9/28.
 */
public class ReceiveBootCompleted extends BroadcastReceiver {
    @Override
    public void onReceive(Context context, Intent intent) {
        if(intent.getAction().equalsIgnoreCase(Intent.ACTION_BOOT_COMPLETED))
        {
            Intent it = new Intent(context, NCUELecturesService.class);
            PendingIntent pt = PendingIntent.getService(context, 0, it, 0);
            AlarmManager am = (AlarmManager) context.getSystemService(Context.ALARM_SERVICE);
            am.setRepeating(AlarmManager.RTC_WAKEUP, Calendar.getInstance().getTimeInMillis(), 30 * 60 * 1000, pt);
            context.startService(it);
        }
    }
}
