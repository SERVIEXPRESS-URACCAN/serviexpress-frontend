import { signOut } from "next-auth/react"
import Swal from "sweetalert2"

let isShowing = false

export async function handleSessionExpired() {
  if (isShowing) return
  isShowing = true

  await Swal.fire({
    icon: "warning",
    title: "Sesión expirada",
    text: "Tu sesión ha expirado, serás redirigido al login.",
    showConfirmButton: false,
    allowOutsideClick: false,
    allowEscapeKey: false,
    timer: 3000,
    timerProgressBar: true,
  })

  isShowing = false
  await signOut({ redirect: false })
  window.location.href = "/login"
}