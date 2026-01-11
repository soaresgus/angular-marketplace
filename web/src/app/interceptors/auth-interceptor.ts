import { HttpHandlerFn, HttpRequest } from "@angular/common/http";
import { inject } from "@angular/core";
import { UserAuthService } from "../services/user-auth";

export const authInterceptor = (req: HttpRequest<unknown>, next: HttpHandlerFn) => {
    const _userAuthService = inject(UserAuthService)

    const HAS_TOKEN = _userAuthService.getUserToken();
    if(HAS_TOKEN) {
        const newRequest = req.clone({
            headers: req.headers.append('Authorization', `Bearer ${HAS_TOKEN}`)
        })

        return next(newRequest)
    }

    return next(req)
}
