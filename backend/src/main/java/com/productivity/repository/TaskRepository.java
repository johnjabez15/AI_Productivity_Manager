package com.productivity.repository;

import com.productivity.model.Task;
import com.productivity.model.Task.TaskStatus;
import com.productivity.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface TaskRepository extends JpaRepository<Task, Long> {
    List<Task> findByUser(User user);
    List<Task> findByUserAndStatus(User user, TaskStatus status);
    List<Task> findByUserOrderByDeadlineAsc(User user);
}
