package quiz.backend.user.mapper;

import org.mapstruct.BeanMapping;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import quiz.backend.user.dto.Register;
import quiz.backend.user.dto.UserProfile;
import quiz.backend.user.entity.User;

@Mapper(componentModel = "spring")
public interface UserMapper {

    @Mapping(target = "name", source = "name")
    @Mapping(target = "email", source = "email")
    @Mapping(target = "password", ignore = true)
    @BeanMapping(ignoreByDefault = true)
    User toUser(Register register);

    UserProfile toUserProfile(User user);
}
