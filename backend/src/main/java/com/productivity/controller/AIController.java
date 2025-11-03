package com.productivity.controller;

import com.productivity.dto.ChatRequest;
import com.productivity.dto.ChatResponse;
import com.productivity.model.Task;
import com.productivity.service.AIService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/ai")
public class AIController {

    @Autowired
    private AIService aiService;

    @PostMapping("/chat")
    public ResponseEntity<ChatResponse> chat(@RequestBody ChatRequest request) {
        return ResponseEntity.ok(aiService.chat(request.getMessage()));
    }

    @PostMapping("/schedule-tasks")
    public ResponseEntity<List<Task>> scheduleTasks() {
        return ResponseEntity.ok(aiService.scheduleTasks());
    }
}
