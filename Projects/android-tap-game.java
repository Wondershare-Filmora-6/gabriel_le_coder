// MainActivity.java
package com.example.tapgame;

import android.os.Bundle;
import android.os.CountDownTimer;
import android.view.View;
import android.widget.Button;
import android.widget.TextView;
import androidx.appcompat.app.AppCompatActivity;

public class MainActivity extends AppCompatActivity {
    private Button tapButton;
    private TextView scoreText;
    private TextView timerText;
    private int score = 0;
    private CountDownTimer timer;
    private static final long GAME_DURATION = 30000; // 30 seconds

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        tapButton = findViewById(R.id.tap_button);
        scoreText = findViewById(R.id.score_text);
        timerText = findViewById(R.id.timer_text);

        tapButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                score++;
                updateScore();
            }
        });

        startGame();
    }

    private void startGame() {
        score = 0;
        updateScore();
        tapButton.setEnabled(true);

        timer = new CountDownTimer(GAME_DURATION, 1000) {
            public void onTick(long millisUntilFinished) {
                timerText.setText("Time: " + millisUntilFinished / 1000);
            }

            public void onFinish() {
                timerText.setText("Time's up!");
                tapButton.setEnabled(false);
            }
        }.start();
    }

    private void updateScore() {
        scoreText.setText("Score: " + score);
    }
}

// activity_main.xml
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:orientation="vertical"
    android:padding="16dp"
    android:gravity="center">

    <TextView
        android:id="@+id/timer_text"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="Time: 30"
        android:textSize="24sp"
        android:layout_marginBottom="16dp"/>

    <TextView
        android:id="@+id/score_text"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="Score: 0"
        android:textSize="24sp"
        android:layout_marginBottom="32dp"/>

    <Button
        android:id="@+id/tap_button"
        android:layout_width="200dp"
        android:layout_height="200dp"
        android:text="TAP ME!"
        android:textSize="24sp"/>

</LinearLayout>
