package com.easynews.easynewsserver.service;

import com.easynews.easynewsserver.model.TextRequest;
import com.easynews.easynewsserver.model.TextResponse;
import com.easynews.easynewsserver.model.db.Text;
import com.easynews.easynewsserver.model.db.User;
import com.easynews.easynewsserver.repository.TextRepository;
import com.easynews.easynewsserver.repository.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class TextService {
    private final TextRepository textRepository;
    private final UserRepository userRepository;

    TextService(@Autowired TextRepository textRepository, @Autowired UserRepository userRepository) {
        this.textRepository = textRepository;
        this.userRepository = userRepository;
    }

    public List<TextResponse> getAllUsersText(String userEmail) {
        User user = userRepository.findById(userEmail)
                .orElseThrow(() -> new EntityNotFoundException("User not found!!"));
        List<Text> userTextList = textRepository.findAllByUser(user);
        List<TextResponse> response = new ArrayList<>();
        for (Text text : userTextList) {
            response.add(convertToTextResponse(text));
        }
        return response;
    }

    public TextResponse saveText(TextRequest textRequest) {
        User user = userRepository.findById(textRequest.email())
                .orElseThrow(() -> new EntityNotFoundException("User not found!!"));

        Text text = new Text();
        text.setTitle(textRequest.title());
        text.setText(textRequest.customText());
        text.setUser(user);

        text = textRepository.save(text);
        System.out.println("texto salvo!");

        return convertToTextResponse(text);
    }

    private TextResponse convertToTextResponse(Text text) {
        return new TextResponse(text.getTextId(), text.getTitle(), text.getText());
    }
}
